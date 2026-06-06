using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyChurch.Application.DTOs.Departments;
using MyChurch.Application.Interfaces;

namespace MyChurch.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly IDepartmentService _service;
    public DepartmentsController(IDepartmentService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var dept = await _service.GetByIdAsync(id);
        return dept == null ? NotFound() : Ok(dept);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateDepartmentDto dto)
        => Ok(await _service.CreateAsync(dto));

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Pastor")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateDepartmentDto dto)
        => Ok(await _service.UpdateAsync(id, dto));

    [HttpPost("{id}/members/{userId}")]
    [Authorize(Roles = "Admin,Pastor,Leader")]
    public async Task<IActionResult> AddMember(Guid id, string userId, [FromQuery] string role = "Membre")
    {
        await _service.AddMemberAsync(id, userId, role);
        return Ok();
    }

    [HttpDelete("{id}/members/{userId}")]
    [Authorize(Roles = "Admin,Pastor,Leader")]
    public async Task<IActionResult> RemoveMember(Guid id, string userId)
    {
        await _service.RemoveMemberAsync(id, userId);
        return NoContent();
    }
}
