using MyChurch.Domain.Common;
namespace MyChurch.Domain.Entities;
public class DailyVerse : BaseEntity
{
    public string Reference { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public string Book { get; set; } = string.Empty;
    public int Chapter { get; set; }
    public int Verse { get; set; }
    public DateTime ScheduledFor { get; set; }
}
