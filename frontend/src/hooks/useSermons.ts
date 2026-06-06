import { useQuery } from '@tanstack/react-query'
import { sermonsApi } from '../api/sermons'

export const useSermons = (page = 1) =>
  useQuery({ queryKey: ['sermons', page], queryFn: () => sermonsApi.getAll(page), staleTime: 5 * 60 * 1000 })

export const useLiveStatus = () =>
  useQuery({ queryKey: ['live'], queryFn: sermonsApi.getLiveStatus, refetchInterval: 30000 })
