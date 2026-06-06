using MyChurch.Domain.Common;
using MyChurch.Domain.Enums;
namespace MyChurch.Domain.Entities;
public class GalleryItem : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public MediaType Type { get; set; } = MediaType.Image;
    public string? Album { get; set; }
    public DateTime TakenAt { get; set; }
    public string? UploadedByUserId { get; set; }
    public ApplicationUser? UploadedBy { get; set; }
}
