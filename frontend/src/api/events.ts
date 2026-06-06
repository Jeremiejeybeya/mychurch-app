import { api } from './client'
import type { ChurchEvent } from '../types'
export const eventsApi = {
  getAll: (page=1) => api.get<ChurchEvent[]>('/events',{params:{page}}).then(r=>r.data),
  getUpcoming: () => api.get<ChurchEvent[]>('/events/upcoming').then(r=>r.data),
  getById: (id:string) => api.get<ChurchEvent>(`/events/${id}`).then(r=>r.data),
  register: (id:string) => api.post(`/events/${id}/register`),
  unregister: (id:string) => api.delete(`/events/${id}/register`),
}
