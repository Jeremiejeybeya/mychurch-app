using MyChurch.Domain.Common;
namespace MyChurch.Domain.Entities;
public class Activity : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime ScheduledAt { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public Guid? DepartmentId { get; set; }
    public Department? Department { get; set; }
}
