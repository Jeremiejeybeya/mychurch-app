using MyChurch.Domain.Enums;
namespace MyChurch.Application.DTOs.Gallery;
public record GalleryItemDto(Guid Id, string Title, string? Description, string Url,
    string? ThumbnailUrl, MediaType Type, string? Album, DateTime TakenAt);
public record UploadGalleryItemDto(string Title, string? Description, string? Album,
    MediaType Type, DateTime TakenAt);
