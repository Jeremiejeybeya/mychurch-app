import { useQuery } from '@tanstack/react-query'
import { donationsApi } from '../api/donations'

export const useDonationStats = () =>
  useQuery({ queryKey: ['donation-stats'], queryFn: donationsApi.getStats, staleTime: 60 * 1000 })
