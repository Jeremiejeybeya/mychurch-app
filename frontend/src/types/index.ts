export interface User { id:string; firstName:string; lastName:string; email:string; role:'Member'|'Leader'|'Pastor'|'Admin'; profilePictureUrl?:string }
export interface AuthState { user:User|null; token:string|null; isAuthenticated:boolean }
export interface Sermon { id:string; title:string; description:string; speaker:string; preachedAt:string; youTubeVideoId?:string; thumbnailUrl?:string; scriptureReference?:string; viewCount:number; series?:string; isActive:boolean }
export interface LiveStreamStatus { isLive:boolean; streamId?:string; title?:string; viewerCount:number; startedAt?:string }
export type EventCategory = 'Culte'|'Sacrement'|'Social'|'Etude'|'Jeunesse'|'Autre'
export interface ChurchEvent { id:string; title:string; description:string; startDate:string; endDate:string; location:string; category:EventCategory; imageUrl?:string; maxCapacity?:number; requiresRegistration:boolean; registrationCount:number; isActive:boolean }
export interface DonationStats { totalThisMonth:number; totalThisYear:number; activeDonors:number; totalDonations:number }
export interface Department { id:string; name:string; description:string; iconName:string; colorHex:string; leaderName?:string; memberCount:number; meetingSchedule?:string }
export type MediaType = 'Video'|'Audio'|'Image'|'Document'
export interface GalleryItem { id:string; title:string; description?:string; url:string; thumbnailUrl?:string; type:MediaType; album?:string; takenAt:string }
