using MyChurch.Application.DTOs.Events;
namespace MyChurch.Application.Interfaces;
public interface IEventService
{
    Task<IEnumerable<EventDto>> GetUpcomingAsync();
    Task<IEnumerable<EventDto>> GetAllAsync(int page = 1, int pageSize = 20);
    Task<EventDto?> GetByIdAsync(Guid id);
    Task<EventDto> CreateAsync(CreateEventDto dto);
    Task<EventDto> UpdateAsync(Guid id, UpdateEventDto dto);
    Task DeleteAsync(Guid id);
    Task RegisterUserAsync(Guid eventId, string userId);
    Task UnregisterUserAsync(Guid eventId, string userId);
}
