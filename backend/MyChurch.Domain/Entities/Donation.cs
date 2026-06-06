using MyChurch.Domain.Common;
using MyChurch.Domain.Enums;
namespace MyChurch.Domain.Entities;
public class Donation : BaseEntity
{
    public string? UserId { get; set; }
    public ApplicationUser? User { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "CAD";
    public DonationStatus Status { get; set; } = DonationStatus.Pending;
    public DonationFrequency Frequency { get; set; } = DonationFrequency.OneTime;
    public string? StripePaymentIntentId { get; set; }
    public string? StripeCustomerId { get; set; }
    public string? Note { get; set; }
    public DateTime DonatedAt { get; set; } = DateTime.UtcNow;
}
