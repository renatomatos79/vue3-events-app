using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eventsapi.Controllers;

[Authorize]
[Route("api")]
[ApiController]
public class EventsController : ControllerBase
{
    private readonly ITokenService tokenService;
    private readonly ICacheManager cacheManager;
    private readonly IHttpContextAccessor httpContextAccessor;
    
    private string UserCacheKey()
    {
        var userName = tokenService.GetUserName(this.User);
        return $"${GlobalConstants.REDIS_USER_EVENTS_KEY}_${userName}";
    }

    private List<string> UserEvents()
    {
        var key = UserCacheKey();
        var cache = cacheManager.Get<List<string>>(key);
        return cache?.Item ?? new List<string>();
    }

    public EventsController(ITokenService tokenService, ICacheManager cacheManager, IHttpContextAccessor httpContextAccessor)
    {
        this.tokenService = tokenService;
        this.cacheManager = cacheManager;
        this.httpContextAccessor = httpContextAccessor;
    }

    [HttpGet("events")]
    public async Task<IActionResult> Get()
    {
        var cache = cacheManager.Get<List<EventResponse>>(GlobalConstants.REDIS_EVENTS_KEY);
        var result = new List<EventResponse>();
        if (cache?.Item != null)
        {
          var headers = this.httpContextAccessor.HttpContext?.Response.GetTypedHeaders();
          if (headers != null) 
          {
                headers.CacheControl = new Microsoft.Net.Http.Headers.CacheControlHeaderValue
                {
                    Public = true,
                    MaxAge = TimeSpan.FromSeconds(cache.MaxAgeInSeconds)
                };
          }

          var userEvents = UserEvents();
          
          foreach (var item in cache.Item)
          {
            item.Subscribed = userEvents.Any(a => a == item.Id.ToString());
          }
          
          result = cache.Item;
        }
        // if no cache, returns an empty list
        return await Task.FromResult(Ok(result));
    }

    [HttpPost("events")]
    public async Task<IActionResult> AddEvents([FromBody] EventRequest request)
    {
        if (request == null || !(request.Events?.Any() ?? false))
        {
          throw new ArgumentNullException("Request is null or invalid.");            
        }
        this.cacheManager.Add(GlobalConstants.REDIS_EVENTS_KEY, request.Events, request.Timeout ?? GlobalConstants.TWO_MINUTES);
        return await Task.FromResult(NoContent());
    }

    [HttpPut("events/{id}/subscribe")]
    public async Task<IActionResult> Subscribe(int id, [FromBody] EventSubscribeRequest request)
    {
        if (id <= 0)
        {
          throw new ArgumentNullException("Missing event ID or invalid content (Id <= 0).");
        }
        
        var cache = cacheManager.Get<List<EventResponse>>(GlobalConstants.REDIS_EVENTS_KEY);
        var events = cache?.Item ?? new List<EventResponse>();
        var selectedEvent = events.FirstOrDefault(evt => evt.Id == id);
        if (selectedEvent == null)
        {
            return StatusCode(404, "EventID not found.");
        }

        // user events
        var userEvents = UserEvents();
        userEvents.Add(id.ToString());

        // cache update
        var timeout = request?.Timeout ?? 0;
        var maxTimeout = timeout > 0 ? timeout : GlobalConstants.ONE_DAY;

        this.cacheManager.Add<List<string>>(UserCacheKey(), userEvents, maxTimeout);

        // set the event as subscribed
        selectedEvent.Subscribed = true;

        // returns the selected event
        return await Task.FromResult(Ok(selectedEvent));
    }
}
