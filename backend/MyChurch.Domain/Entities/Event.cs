using MyChurch.Domain.Common;
using MyChurch.Domain.Enums;
namespace MyChurch.Domain.Entities;
public class Event : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Location { get; set; } = string.Empty;
    public EventCategory Category { get; set; }
    public string? ImageUrl { get; set; }
    public int? MaxCapacity { get; set; }
    public bool RequiresRegistration { get; set; }
    public ICollection<EventRegistration> Registrations { get; set; } = new List<EventRegistration>();
}
