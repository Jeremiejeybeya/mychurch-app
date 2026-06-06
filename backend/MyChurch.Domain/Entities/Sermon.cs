using MyChurch.Domain.Common;
namespace MyChurch.Domain.Entities;
public class Sermon : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Speaker { get; set; } = string.Empty;
    public DateTime PreachedAt { get; set; }
    public string? YouTubeVideoId { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? AudioUrl { get; set; }
    public string? ScriptureReference { get; set; }
    public int ViewCount { get; set; }
    public string? Series { get; set; }
}
