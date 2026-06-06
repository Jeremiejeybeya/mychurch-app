using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Microsoft.Extensions.Configuration;
using MyChurch.Application.DTOs.Sermons;
using MyChurch.Application.Interfaces;

namespace MyChurch.Infrastructure.Services.YouTube;

public class YouTubeService : IYouTubeService
{
    private readonly YouTubeService _youTubeClient;
    private readonly string _channelId;

    public YouTubeService(IConfiguration config)
    {
        var apiKey = config["YouTube:ApiKey"] ?? throw new Exception("YouTube:ApiKey missing");
        _channelId = config["YouTube:ChannelId"] ?? throw new Exception("YouTube:ChannelId missing");

        _youTubeClient = new YouTubeService(new BaseClientService.Initializer
        {
            ApiKey = apiKey,
            ApplicationName = "MyChurchApp"
        });
    }

    public async Task<LiveStreamStatusDto?> GetLiveStreamStatusAsync()
    {
        var request = _youTubeClient.Search.List("snippet");
        request.ChannelId = _channelId;
        request.EventType = SearchResource.ListRequest.EventTypeEnum.Live;
        request.Type = "video";
        request.MaxResults = 1;

        var response = await request.ExecuteAsync();
        var liveVideo = response.Items.FirstOrDefault();

        if (liveVideo == null) return new LiveStreamStatusDto(false, null, null, 0, null);

        return new LiveStreamStatusDto(
            IsLive: true,
            StreamId: liveVideo.Id.VideoId,
            Title: liveVideo.Snippet.Title,
            ViewerCount: 0,
            StartedAt: liveVideo.Snippet.PublishedAtDateTimeOffset?.UtcDateTime
        );
    }

    public async Task<IEnumerable<YouTubeVideoDto>> GetChannelVideosAsync(int maxResults = 10)
    {
        var request = _youTubeClient.Search.List("snippet");
        request.ChannelId = _channelId;
        request.Order = SearchResource.ListRequest.OrderEnum.Date;
        request.MaxResults = maxResults;
        request.Type = "video";

        var response = await request.ExecuteAsync();

        return response.Items.Select(v => new YouTubeVideoDto(
            VideoId: v.Id.VideoId,
            Title: v.Snippet.Title,
            Description: v.Snippet.Description,
            ThumbnailUrl: v.Snippet.Thumbnails.Medium.Url,
            PublishedAt: v.Snippet.PublishedAtDateTimeOffset?.UtcDateTime ?? DateTime.UtcNow,
            Duration: "",
            ViewCount: 0
        ));
    }

    public async Task<YouTubeVideoDto?> GetVideoDetailsAsync(string videoId)
    {
        var request = _youTubeClient.Videos.List("snippet,statistics,contentDetails");
        request.Id = videoId;
        var response = await request.ExecuteAsync();
        var video = response.Items.FirstOrDefault();
        if (video == null) return null;

        return new YouTubeVideoDto(
            VideoId: video.Id,
            Title: video.Snippet.Title,
            Description: video.Snippet.Description,
            ThumbnailUrl: video.Snippet.Thumbnails.Medium.Url,
            PublishedAt: video.Snippet.PublishedAtDateTimeOffset?.UtcDateTime ?? DateTime.UtcNow,
            Duration: video.ContentDetails.Duration,
            ViewCount: (int)(video.Statistics.ViewCount ?? 0)
        );
    }
}
