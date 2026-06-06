import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import BiblePage from './pages/BiblePage'
import SermonsPage from './pages/SermonsPage'
import EventsPage from './pages/EventsPage'
import DonationsPage from './pages/DonationsPage'
import GalleryPage from './pages/GalleryPage'
import DepartmentsPage from './pages/DepartmentsPage'
import ActivitiesPage from './pages/ActivitiesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import { useAuthStore } from './store/slices/authStore'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="bible" element={<BiblePage />} />
        <Route path="sermons" element={<SermonsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="admin/*" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}
