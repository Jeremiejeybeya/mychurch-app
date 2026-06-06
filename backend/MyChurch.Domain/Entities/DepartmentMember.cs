using MyChurch.Domain.Common;
namespace MyChurch.Domain.Entities;
public class DepartmentMember : BaseEntity
{
    public Guid DepartmentId { get; set; }
    public Department Department { get; set; } = null!;
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;
    public string Role { get; set; } = "Membre";
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}
