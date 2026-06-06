using MyChurch.Domain.Enums;
namespace MyChurch.Application.DTOs.Events;
public record EventDto(Guid Id, string Title, string Description, DateTime StartDate,
    DateTime EndDate, string Location, EventCategory Category, string? ImageUrl,
    int? MaxCapacity, bool RequiresRegistration, int RegistrationCount, bool IsActive);
public record CreateEventDto(string Title, string Description, DateTime StartDate,
    DateTime EndDate, string Location, EventCategory Category, string? ImageUrl,
    int? MaxCapacity, bool RequiresRegistration);
public record UpdateEventDto(string? Title, string? Description, DateTime? StartDate,
    DateTime? EndDate, string? Location, EventCategory? Category, string? ImageUrl,
    int? MaxCapacity, bool? RequiresRegistration);
