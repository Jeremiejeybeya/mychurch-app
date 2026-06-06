using MyChurch.Domain.Common;
namespace MyChurch.Domain.Entities;
public class EventRegistration : BaseEntity
{
    public Guid EventId { get; set; }
    public Event Event { get; set; } = null!;
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;
    public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
}
