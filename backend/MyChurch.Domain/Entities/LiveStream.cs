using MyChurch.Domain.Common;
namespace MyChurch.Domain.Entities;
public class LiveStream : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string YouTubeStreamId { get; set; } = string.Empty;
    public DateTime ScheduledAt { get; set; }
    public bool IsLive { get; set; }
    public int ViewerCount { get; set; }
}
