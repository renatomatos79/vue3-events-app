using Microsoft.AspNetCore.Mvc;

namespace eventsapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly ITokenService tokenService;
    public LoginController(ITokenService tokenService)
    {
        this.tokenService = tokenService;
    }

    [HttpPost(Name = "/token")]
    public string Token([FromBody] LoginRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.userName) || string.IsNullOrEmpty(request.password))
        {
            throw new ArgumentNullException("Request is null or invalid.");
        }
        if (!(request?.userName == "renatomatos79" && request?.password == "123456"))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }
        return tokenService.GenerateToken(request.userName, "Admin");
    }
}
