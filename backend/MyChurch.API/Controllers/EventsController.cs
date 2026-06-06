using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyChurch.Application.DTOs.Events;
using MyChurch.Application.Interfaces;
using System.Security.Claims;

namespace MyChurch.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventService _service;
    public EventsController(IEventService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => Ok(await _service.GetAllAsync(page, pageSize));

    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcoming()
        => Ok(await _service.GetUpcomingAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var ev = await _service.GetByIdAsync(id);
        return ev == null ? NotFound() : Ok(ev);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Pastor,Leader")]
    public async Task<IActionResult> Create([FromBody] CreateEventDto dto)
        => Ok(await _service.CreateAsync(dto));

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Pastor,Leader")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEventDto dto)
        => Ok(await _service.UpdateAsync(id, dto));

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/register")]
    [Authorize]
    public async Task<IActionResult> Register(Guid id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        await _service.RegisterUserAsync(id, userId);
        return Ok();
    }

    [HttpDelete("{id}/register")]
    [Authorize]
    public async Task<IActionResult> Unregister(Guid id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        await _service.UnregisterUserAsync(id, userId);
        return NoContent();
    }
}
