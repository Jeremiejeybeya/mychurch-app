using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyChurch.Application.DTOs.Sermons;
using MyChurch.Application.Interfaces;

namespace MyChurch.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SermonsController : ControllerBase
{
    private readonly ISermonService _service;
    private readonly IYouTubeService _youtube;

    public SermonsController(ISermonService service, IYouTubeService youtube)
    {
        _service = service;
        _youtube = youtube;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        => Ok(await _service.GetAllAsync(page, pageSize));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var sermon = await _service.GetByIdAsync(id);
        return sermon == null ? NotFound() : Ok(sermon);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string q)
        => Ok(await _service.SearchAsync(q));

    [HttpGet("live")]
    public async Task<IActionResult> GetLiveStatus()
        => Ok(await _youtube.GetLiveStreamStatusAsync());

    [HttpGet("youtube")]
    public async Task<IActionResult> GetYouTubeVideos([FromQuery] int max = 10)
        => Ok(await _youtube.GetChannelVideosAsync(max));

    [HttpPost]
    [Authorize(Roles = "Admin,Pastor")]
    public async Task<IActionResult> Create([FromBody] CreateSermonDto dto)
        => Ok(await _service.CreateAsync(dto));

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Pastor")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSermonDto dto)
        => Ok(await _service.UpdateAsync(id, dto));

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/view")]
    public async Task<IActionResult> IncrementView(Guid id)
    {
        await _service.IncrementViewCountAsync(id);
        return NoContent();
    }
}
