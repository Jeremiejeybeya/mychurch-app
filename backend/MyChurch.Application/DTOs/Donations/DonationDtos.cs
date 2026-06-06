using MyChurch.Domain.Enums;
namespace MyChurch.Application.DTOs.Donations;
public record DonationDto(Guid Id, decimal Amount, string Currency, DonationStatus Status,
    DonationFrequency Frequency, DateTime DonatedAt, string? Note);
public record CreateDonationDto(decimal Amount, string Currency, DonationFrequency Frequency,
    string? Note, string? UserId);
public record CreatePaymentIntentResponseDto(string ClientSecret, string PaymentIntentId);
public record DonationStatsDto(decimal TotalThisMonth, decimal TotalThisYear,
    int ActiveDonors, int TotalDonations);
