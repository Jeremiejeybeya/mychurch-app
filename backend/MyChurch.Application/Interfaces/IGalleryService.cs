using MyChurch.Application.DTOs.Gallery;
namespace MyChurch.Application.Interfaces;
public interface IGalleryService
{
    Task<IEnumerable<GalleryItemDto>> GetAllAsync(string? album = null);
    Task<GalleryItemDto> UploadAsync(UploadGalleryItemDto dto, Stream fileStream, string fileName);
    Task DeleteAsync(Guid id);
    Task<IEnumerable<string>> GetAlbumsAsync();
}
