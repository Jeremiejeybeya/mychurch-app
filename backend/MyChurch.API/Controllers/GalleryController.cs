using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyChurch.Application.DTOs.Gallery;
using MyChurch.Application.Interfaces;
using MyChurch.Domain.Enums;

namespace MyChurch.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GalleryController : ControllerBase
{
    private readonly IGalleryService _service;
    public GalleryController(IGalleryService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? album = null)
        => Ok(await _service.GetAllAsync(album));

    [HttpGet("albums")]
    public async Task<IActionResult> GetAlbums()
        => Ok(await _service.GetAlbumsAsync());

    [HttpPost]
    [Authorize(Roles = "Admin,Pastor,Leader")]
    public async Task<IActionResult> Upload([FromForm] UploadGalleryItemDto dto, IFormFile file)
    {
        if (file == null || file.Length == 0) return BadRequest("File required");
        using var stream = file.OpenReadStream();
        var result = await _service.UploadAsync(dto, stream, file.FileName);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
