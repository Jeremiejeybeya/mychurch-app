using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyChurch.Application.DTOs.Donations;
using MyChurch.Application.Interfaces;
using System.Security.Claims;

namespace MyChurch.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DonationsController : ControllerBase
{
    private readonly IDonationService _service;
    public DonationsController(IDonationService service) => _service = service;

    [HttpPost("intent")]
    public async Task<IActionResult> CreateIntent([FromBody] CreateDonationDto dto)
    {
        if (User.Identity?.IsAuthenticated == true)
            dto = dto with { UserId = User.FindFirstValue(ClaimTypes.NameIdentifier) };
        return Ok(await _service.CreatePaymentIntentAsync(dto));
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
        => Ok(await _service.GetStatsAsync());

    [HttpGet("my")]
    [Authorize]
    public async Task<IActionResult> GetMyDonations()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        return Ok(await _service.GetUserDonationsAsync(userId));
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var payload = await new StreamReader(Request.Body).ReadToEndAsync();
        var signature = Request.Headers["Stripe-Signature"].ToString();
        await _service.HandleStripeWebhookAsync(payload, signature);
        return Ok();
    }
}
