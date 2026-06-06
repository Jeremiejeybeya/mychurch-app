import { useQuery } from '@tanstack/react-query'
import { eventsApi } from '../api/events'

export const useUpcomingEvents = () =>
  useQuery({ queryKey: ['events', 'upcoming'], queryFn: eventsApi.getUpcoming, staleTime: 10 * 60 * 1000 })

export const useAllEvents = (page = 1) =>
  useQuery({ queryKey: ['events', page], queryFn: () => eventsApi.getAll(page) })
