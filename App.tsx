import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav'; // Import
import Home from './pages/Home';
import Knowledge from './pages/Knowledge';
import ArticleView from './pages/ArticleView';
import Tools from './pages/Tools';
import Community from './pages/Community';
import Diagnosis from './pages/Diagnosis';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminArticles from './pages/admin/AdminArticles';
import AdminSpecialists from './pages/admin/AdminSpecialists';
import AdminForum from './pages/admin/AdminForum';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminSettings from './pages/admin/AdminSettings';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-warm-50 dark:bg-warm-950 font-sans text-warm-900 dark:text-warm-100 transition-colors duration-300">
        <Header />
        {/* Added pb-20 for mobile bottom nav spacing */}
        <main className="flex-grow pb-20 md:pb-0">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/knowledge/:id" element={<ArticleView />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/community" element={<Community />} />
            <Route path="/diagnosis" element={<Diagnosis />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="specialists" element={<AdminSpecialists />} />
              <Route path="community" element={<AdminForum />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <MobileBottomNav />
        
        <ConditionalFooter />
      </div>
    </Router>
  );
};

// Helper component to hide footer on admin pages
const ConditionalFooter = () => {
  const isWindowDefined = typeof window !== 'undefined';
  const isAdmin = isWindowDefined && window.location.hash.includes('admin');
  
  if (isAdmin) return null;
  // Add margin-bottom on mobile so footer isn't covered by nav
  return <div className="mb-16 md:mb-0"><Footer /></div>;
}

export default App;