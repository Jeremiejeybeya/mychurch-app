import { useQuery } from '@tanstack/react-query'
import { departmentsApi } from '../api/departments'

export const useDepartments = () =>
  useQuery({ queryKey: ['departments'], queryFn: departmentsApi.getAll, staleTime: 30 * 60 * 1000 })
