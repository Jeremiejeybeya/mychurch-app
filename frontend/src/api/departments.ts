import { api } from './client'
import type { Department } from '../types'
export const departmentsApi = {
  getAll: () => api.get<Department[]>('/departments').then(r=>r.data),
  getById: (id:string) => api.get<Department>(`/departments/${id}`).then(r=>r.data),
}
