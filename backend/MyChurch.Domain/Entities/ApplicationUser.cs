using Microsoft.AspNetCore.Identity;
using MyChurch.Domain.Enums;
namespace MyChurch.Domain.Entities;
public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? ProfilePictureUrl { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public UserRole Role { get; set; } = UserRole.Member;
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Donation> Donations { get; set; } = new List<Donation>();
    public ICollection<DepartmentMember> DepartmentMemberships { get; set; } = new List<DepartmentMember>();
    public ICollection<EventRegistration> EventRegistrations { get; set; } = new List<EventRegistration>();
}
