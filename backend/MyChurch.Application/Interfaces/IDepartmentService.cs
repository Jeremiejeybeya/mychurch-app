using MyChurch.Application.DTOs.Departments;
namespace MyChurch.Application.Interfaces;
public interface IDepartmentService
{
    Task<IEnumerable<DepartmentDto>> GetAllAsync();
    Task<DepartmentDto?> GetByIdAsync(Guid id);
    Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto);
    Task<DepartmentDto> UpdateAsync(Guid id, UpdateDepartmentDto dto);
    Task AddMemberAsync(Guid departmentId, string userId, string role = "Membre");
    Task RemoveMemberAsync(Guid departmentId, string userId);
}
