namespace MyChurch.Application.DTOs.Departments;
public record DepartmentDto(Guid Id, string Name, string Description, string IconName,
    string ColorHex, string? LeaderName, int MemberCount, string? MeetingSchedule);
public record CreateDepartmentDto(string Name, string Description, string IconName,
    string ColorHex, string? LeaderId, string? MeetingSchedule);
public record UpdateDepartmentDto(string? Name, string? Description, string? IconName,
    string? ColorHex, string? LeaderId, string? MeetingSchedule);
public record DepartmentMemberDto(string UserId, string FullName, string Role,
    string? ProfilePictureUrl, DateTime JoinedAt);
