using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyChurch.Application.DTOs.Donations;
using MyChurch.Application.Interfaces;
using MyChurch.Domain.Entities;
using MyChurch.Domain.Enums;
using MyChurch.Infrastructure.Data;
using Stripe;

namespace MyChurch.Infrastructure.Services.Stripe;

public class StripeService : IDonationService
{
    private readonly AppDbContext _db;
    private readonly string _webhookSecret;

    public StripeService(AppDbContext db, IConfiguration config)
    {
        _db = db;
        StripeConfiguration.ApiKey = config["Stripe:SecretKey"];
        _webhookSecret = config["Stripe:WebhookSecret"] ?? "";
    }

    public async Task<CreatePaymentIntentResponseDto> CreatePaymentIntentAsync(CreateDonationDto dto)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(dto.Amount * 100),
            Currency = dto.Currency.ToLower(),
            Metadata = new Dictionary<string, string>
            {
                { "userId", dto.UserId ?? "anonymous" },
                { "frequency", dto.Frequency.ToString() },
                { "note", dto.Note ?? "" }
            }
        };

        var service = new PaymentIntentService();
        var intent = await service.CreateAsync(options);

        var donation = new Donation
        {
            UserId = dto.UserId,
            Amount = dto.Amount,
            Currency = dto.Currency,
            Frequency = dto.Frequency,
            Note = dto.Note,
            StripePaymentIntentId = intent.Id,
            Status = DonationStatus.Pending
        };
        _db.Donations.Add(donation);
        await _db.SaveChangesAsync();

        return new CreatePaymentIntentResponseDto(intent.ClientSecret, intent.Id);
    }

    public async Task ConfirmDonationAsync(string paymentIntentId)
    {
        var donation = await _db.Donations
            .FirstOrDefaultAsync(d => d.StripePaymentIntentId == paymentIntentId);
        if (donation != null)
        {
            donation.Status = DonationStatus.Completed;
            donation.DonatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<DonationDto>> GetUserDonationsAsync(string userId) =>
        await _db.Donations
            .Where(d => d.UserId == userId && d.IsActive)
            .OrderByDescending(d => d.DonatedAt)
            .Select(d => new DonationDto(d.Id, d.Amount, d.Currency, d.Status,
                d.Frequency, d.DonatedAt, d.Note))
            .ToListAsync();

    public async Task<DonationStatsDto> GetStatsAsync()
    {
        var now = DateTime.UtcNow;
        var monthStart = new DateTime(now.Year, now.Month, 1);
        var yearStart = new DateTime(now.Year, 1, 1);

        var totalMonth = await _db.Donations
            .Where(d => d.Status == DonationStatus.Completed && d.DonatedAt >= monthStart)
            .SumAsync(d => d.Amount);

        var totalYear = await _db.Donations
            .Where(d => d.Status == DonationStatus.Completed && d.DonatedAt >= yearStart)
            .SumAsync(d => d.Amount);

        var activeDonors = await _db.Donations
            .Where(d => d.Status == DonationStatus.Completed && d.UserId != null)
            .Select(d => d.UserId).Distinct().CountAsync();

        var totalDonations = await _db.Donations
            .CountAsync(d => d.Status == DonationStatus.Completed);

        return new DonationStatsDto(totalMonth, totalYear, activeDonors, totalDonations);
    }

    public Task HandleStripeWebhookAsync(string payload, string signature)
    {
        var stripeEvent = EventUtility.ConstructEvent(payload, signature, _webhookSecret);
        if (stripeEvent.Type == Events.PaymentIntentSucceeded)
        {
            var intent = (PaymentIntent)stripeEvent.Data.Object;
            return ConfirmDonationAsync(intent.Id);
        }
        return Task.CompletedTask;
    }
}
