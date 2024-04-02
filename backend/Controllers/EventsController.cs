using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using eventsapi;
using System.Diagnostics.Tracing;

namespace eventsapi.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EventsController : ControllerBase
{
    private readonly string FORMAT = "yyyy-MM-ddTHH:mm:ssZ";
    private readonly ICacheManager cacheManager;
    private readonly IHttpContextAccessor httpContextAccessor;
    
    private readonly int TWO_MINUTES = 120;
    private readonly int ONE_DAY = 24 * 60;

    public string UserCacheKey()
    {
        return this.User?.Identity?.Name ?? "myEvents";        
    }

    public List<string> UserEvents()
    {
        var key = UserCacheKey();
        // gets the user events
        return cacheManager.Get<List<string>>(key)?.Item ?? new List<string>();
    }

    public EventsController(ICacheManager cacheManager, IHttpContextAccessor httpContextAccessor)
    {
        this.cacheManager = cacheManager;
        this.httpContextAccessor = httpContextAccessor;
    }

    [HttpGet(Name = "/events")]
    public async Task<IActionResult> Get()
    {
        var cache = cacheManager.Get<List<EventResponse>>("events");
        var result = new List<EventResponse>();
        if (cache != null && cache.Item != null)
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
            item.Subscribed = userEvents.Contains(item.Id);
          }
          
          result = cache.Item;
        }
        // if no cache, returns an empty list
        return await Task.FromResult(Ok(result));
    }

    [HttpPost(Name = "/events")]
    public async Task<IActionResult> AddEvents([FromBody] List<EventResponse> events)
    {
        if (events == null || !events.Any())
        {
          throw new ArgumentNullException("Request is null or invalid.");            
        }
        this.cacheManager.Add("events", events, TWO_MINUTES);
        return await Task.FromResult(NoContent());
    }

    [HttpPut(Name = "/subscribe/{eventID}")]
    public async Task<IActionResult> Subscribe([FromRoute] string eventID)
    {
        if (string.IsNullOrEmpty(eventID))
        {
          throw new ArgumentNullException("Missing event ID.");            
        }
        
        var cache = cacheManager.Get<List<EventResponse>>("events");
        var selectedEvent = cache.Item.FirstOrDefault(evt => evt.Id == eventID);
        if (selectedEvent == null)
        {
            return StatusCode(404, "EventID not found.");
        }

        // gets the user events
        var events = UserEvents();
        events.Add(eventID);
        
        // updates cache
        this.cacheManager.Add(UserCacheKey(), events, ONE_DAY);

        // returns the selected event
        return await Task.FromResult(Ok(selectedEvent));
    }
}
