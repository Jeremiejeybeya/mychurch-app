using MyChurch.Domain.Common;
namespace MyChurch.Domain.Entities;
public class Department : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
    public string ColorHex { get; set; } = "#1A56DB";
    public string? LeaderId { get; set; }
    public ApplicationUser? Leader { get; set; }
    public string? MeetingSchedule { get; set; }
    public ICollection<DepartmentMember> Members { get; set; } = new List<DepartmentMember>();
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
}
