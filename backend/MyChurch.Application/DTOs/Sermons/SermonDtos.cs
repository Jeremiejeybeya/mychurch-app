namespace MyChurch.Application.DTOs.Sermons;
public record SermonDto(Guid Id, string Title, string Description, string Speaker,
    DateTime PreachedAt, string? YouTubeVideoId, string? ThumbnailUrl,
    string? ScriptureReference, int ViewCount, string? Series, bool IsActive);
public record CreateSermonDto(string Title, string Description, string Speaker,
    DateTime PreachedAt, string? YouTubeVideoId, string? ScriptureReference, string? Series);
public record UpdateSermonDto(string? Title, string? Description, string? Speaker,
    string? YouTubeVideoId, string? ScriptureReference, string? Series);
public record LiveStreamStatusDto(bool IsLive, string? StreamId, string? Title,
    int ViewerCount, DateTime? StartedAt);
public record YouTubeVideoDto(string VideoId, string Title, string Description,
    string ThumbnailUrl, DateTime PublishedAt, string Duration, int ViewCount);
