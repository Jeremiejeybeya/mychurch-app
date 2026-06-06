using MyChurch.Application.DTOs.Donations;
namespace MyChurch.Application.Interfaces;
public interface IDonationService
{
    Task<CreatePaymentIntentResponseDto> CreatePaymentIntentAsync(CreateDonationDto dto);
    Task ConfirmDonationAsync(string paymentIntentId);
    Task<IEnumerable<DonationDto>> GetUserDonationsAsync(string userId);
    Task<DonationStatsDto> GetStatsAsync();
    Task HandleStripeWebhookAsync(string payload, string signature);
}
