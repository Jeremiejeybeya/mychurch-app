namespace MyChurch.Application.DTOs.Auth;
public record RegisterDto(string FirstName, string LastName, string Email, string Password);
public record LoginDto(string Email, string Password);
public record AuthResponseDto(string Token, string RefreshToken, DateTime ExpiresAt, UserProfileDto User);
public record UserProfileDto(string Id, string FirstName, string LastName, string Email, string Role, string? ProfilePictureUrl);
public record RefreshTokenDto(string Token, string RefreshToken);
public record ForgotPasswordDto(string Email);
public record ResetPasswordDto(string Email, string Token, string NewPassword);
