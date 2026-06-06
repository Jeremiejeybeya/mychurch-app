import { api } from './client'
import type { GalleryItem } from '../types'
export const galleryApi = {
  getAll: (album?:string) => api.get<GalleryItem[]>('/gallery',{params:{album}}).then(r=>r.data),
  getAlbums: () => api.get<string[]>('/gallery/albums').then(r=>r.data),
}
