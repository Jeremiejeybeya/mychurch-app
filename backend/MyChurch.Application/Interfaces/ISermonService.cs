using MyChurch.Application.DTOs.Sermons;
namespace MyChurch.Application.Interfaces;
public interface ISermonService
{
    Task<IEnumerable<SermonDto>> GetAllAsync(int page = 1, int pageSize = 10);
    Task<SermonDto?> GetByIdAsync(Guid id);
    Task<SermonDto> CreateAsync(CreateSermonDto dto);
    Task<SermonDto> UpdateAsync(Guid id, UpdateSermonDto dto);
    Task DeleteAsync(Guid id);
    Task<IEnumerable<SermonDto>> SearchAsync(string query);
    Task IncrementViewCountAsync(Guid id);
}
