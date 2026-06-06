import { api } from './client'
import type { DonationStats } from '../types'
export const donationsApi = {
  getStats: () => api.get<DonationStats>('/donations/stats').then(r=>r.data),
  createIntent: (amount:number,currency='CAD',frequency='OneTime',note?:string) =>
    api.post<{clientSecret:string;paymentIntentId:string}>('/donations/intent',{amount,currency,frequency,note}).then(r=>r.data),
  getMyDonations: () => api.get('/donations/my').then(r=>r.data),
}
