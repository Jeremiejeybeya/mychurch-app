using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Microsoft.Extensions.Configuration;
using MyChurch.Application.DTOs.Sermons;
using MyChurch.Application.Interfaces;

namespace MyChurch.Infrastructure.Services.YouTube;

public class YouTubeApiService : IYouTubeService
{
    private readonly YouTubeService _client;
    private readonly string _channelId;

    public YouTubeApiService(IConfiguration config)
    {
        var apiKey = config["YouTube:ApiKey"] ?? "placeholder";
        _channelId = config["YouTube:ChannelId"] ?? "placeholder";

        _client = new YouTubeService(new BaseClientService.Initializer
        {
            ApiKey = apiKey,
            ApplicationName = "MyChurchApp"
        });
    }

    public async Task<LiveStreamStatusDto?> GetLiveStreamStatusAsync()
    {
        try
        {
            var req = _client.Search.List("snippet");
            req.ChannelId = _channelId;
            req.EventType = SearchResource.ListRequest.EventTypeEnum.Live;
            req.Type = "video";
            req.MaxResults = 1;

            var response = await req.ExecuteAsync();
            var video = response.Items?.FirstOrDefault();

            if (video == null)
                return new LiveStreamStatusDto(false, null, null, 0, null);

            return new LiveStreamStatusDto(
                IsLive: true,
                StreamId: video.Id.VideoId,
                Title: video.Snippet.Title,
                ViewerCount: 0,
                StartedAt: video.Snippet.PublishedAtDateTimeOffset?.UtcDateTime
            );
        }
        catch
        {
            return new LiveStreamStatusDto(false, null, null, 0, null);
        }
    }

    public async Task<IEnumerable<YouTubeVideoDto>> GetChannelVideosAsync(int maxResults = 10)
    {
        try
        {
            var req = _client.Search.List("snippet");
            req.ChannelId = _channelId;
            req.Order = SearchResource.ListRequest.OrderEnum.Date;
            req.MaxResults = maxResults;
            req.Type = "video";

            var response = await req.ExecuteAsync();

            return response.Items?.Select(v => new YouTubeVideoDto(
                VideoId: v.Id.VideoId,
                Title: v.Snippet.Title,
                Description: v.Snippet.Description,
                ThumbnailUrl: v.Snippet.Thumbnails?.Medium?.Url ?? "",
                PublishedAt: v.Snippet.PublishedAtDateTimeOffset?.UtcDateTime ?? DateTime.UtcNow,
                Duration: "",
                ViewCount: 0
            )) ?? Enumerable.Empty<YouTubeVideoDto>();
        }
        catch
        {
            return Enumerable.Empty<YouTubeVideoDto>();
        }
    }

    public async Task<YouTubeVideoDto?> GetVideoDetailsAsync(string videoId)
    {
        try
        {
            var req = _client.Videos.List("snippet,statistics,contentDetails");
            req.Id = videoId;
            var response = await req.ExecuteAsync();
            var video = response.Items?.FirstOrDefault();
            if (video == null) return null;

            return new YouTubeVideoDto(
                VideoId: video.Id,
                Title: video.Snippet.Title,
                Description: video.Snippet.Description,
                ThumbnailUrl: video.Snippet.Thumbnails?.Medium?.Url ?? "",
                PublishedAt: video.Snippet.PublishedAtDateTimeOffset?.UtcDateTime ?? DateTime.UtcNow,
                Duration: video.ContentDetails?.Duration ?? "",
                ViewCount: (int)(video.Statistics?.ViewCount ?? 0)
            );
        }
        catch
        {
            return null;
        }
    }
}
