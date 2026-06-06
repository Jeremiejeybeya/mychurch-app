import { api } from './client'
import type { Sermon, LiveStreamStatus } from '../types'
export const sermonsApi = {
  getAll: (page=1,pageSize=10) => api.get<Sermon[]>('/sermons',{params:{page,pageSize}}).then(r=>r.data),
  getById: (id:string) => api.get<Sermon>(`/sermons/${id}`).then(r=>r.data),
  getLiveStatus: () => api.get<LiveStreamStatus>('/sermons/live').then(r=>r.data),
  getYouTubeVideos: (max=10) => api.get('/sermons/youtube',{params:{max}}).then(r=>r.data),
  incrementView: (id:string) => api.post(`/sermons/${id}/view`),
}
