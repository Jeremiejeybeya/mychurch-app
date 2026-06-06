using MyChurch.Application.DTOs.Sermons;
namespace MyChurch.Application.Interfaces;
public interface IYouTubeService
{
    Task<LiveStreamStatusDto?> GetLiveStreamStatusAsync();
    Task<IEnumerable<YouTubeVideoDto>> GetChannelVideosAsync(int maxResults = 10);
    Task<YouTubeVideoDto?> GetVideoDetailsAsync(string videoId);
}
