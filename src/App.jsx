import { Outlet, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import CampaignsList from './pages/campaigns/CampaignsList'
import CampaignDetail from './pages/campaigns/CampaignDetail'
import CampaignForm from './pages/campaigns/CampaignForm'
import CollaborationsList from './pages/collaborations/CollaborationsList'
import CollaborationDetail from './pages/collaborations/CollaborationDetail'
import CollaborationForm from './pages/collaborations/CollaborationForm'
import CampaignBrowser from './components/CampaignBrowser'
import ApplicationsInbox from './components/ApplicationsInbox'
import MyApplications from './pages/creator/MyApplications'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function AppLayout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0f0f18' }}>
      <Sidebar />
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

function BrowsePage() {
  const { user } = useAuth()
  return <CampaignBrowser creatorName={user?.name ?? ''} />
}

function MyApplicationsPage() {
  const { user } = useAuth()
  return <MyApplications creatorName={user?.name ?? ''} />
}

function InboxPage() {
  return <ApplicationsInbox />
}

function HomeRoute() {
  const { user } = useAuth()
  return user ? <Navigate to="/dashboard" replace /> : <LandingPage />
}

export default function App() {
  const { loading } = useAuth()
  if (loading) return null

  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        {/* Shared */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Brand only */}
        <Route path="/campaigns" element={
          <RoleRoute allowedRole="brand" fallback="/dashboard"><CampaignsList /></RoleRoute>
        } />
        <Route path="/campaigns/new" element={
          <RoleRoute allowedRole="brand" fallback="/dashboard"><CampaignForm /></RoleRoute>
        } />
        <Route path="/campaigns/:id" element={
          <RoleRoute allowedRole="brand" fallback="/dashboard"><CampaignDetail /></RoleRoute>
        } />
        <Route path="/campaigns/:id/edit" element={
          <RoleRoute allowedRole="brand" fallback="/dashboard"><CampaignForm /></RoleRoute>
        } />
        <Route path="/inbox" element={
          <RoleRoute allowedRole="brand" fallback="/dashboard"><InboxPage /></RoleRoute>
        } />

        {/* Creator only */}
        <Route path="/browse" element={
          <RoleRoute allowedRole="creator" fallback="/dashboard"><BrowsePage /></RoleRoute>
        } />
        <Route path="/my-applications" element={
          <RoleRoute allowedRole="creator" fallback="/dashboard"><MyApplicationsPage /></RoleRoute>
        } />
        <Route path="/collaborations" element={
          <RoleRoute allowedRole="creator" fallback="/dashboard"><CollaborationsList /></RoleRoute>
        } />
        <Route path="/collaborations/new" element={
          <RoleRoute allowedRole="creator" fallback="/dashboard"><CollaborationForm /></RoleRoute>
        } />
        <Route path="/collaborations/:id" element={
          <RoleRoute allowedRole="creator" fallback="/dashboard"><CollaborationDetail /></RoleRoute>
        } />
        <Route path="/collaborations/:id/edit" element={
          <RoleRoute allowedRole="creator" fallback="/dashboard"><CollaborationForm /></RoleRoute>
        } />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
