import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, MessageSquare, Settings, LogOut, Brain, Menu, X, Shield, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [user, navigate]);

  const navItems = [
    { label: 'Kokpit', path: '/admin', icon: LayoutDashboard },
    { label: 'Artykuły', path: '/admin/articles', icon: FileText },
    { label: 'Specjaliści', path: '/admin/specialists', icon: Users },
    { label: 'Społeczność', path: '/admin/community', icon: MessageSquare },
    { label: 'Newsletter', path: '/admin/newsletter', icon: Mail },
    { label: 'Ustawienia', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-warm-50 dark:bg-warm-950 flex font-sans text-warm-900 dark:text-warm-100">
      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-white dark:bg-warm-900 border-b border-warm-200 dark:border-warm-800 z-50 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Shield className="text-brand-600" />
          <span className="font-bold">ADHD Hub Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 h-screen w-64 bg-white dark:bg-warm-900 border-r border-warm-200 dark:border-warm-800
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 z-40
        flex flex-col
      `}>
        <div className="p-6 hidden md:flex items-center gap-2 border-b border-warm-100 dark:border-warm-800">
           <div className="bg-brand-500 text-white p-1.5 rounded-lg">
              <Brain size={20} />
            </div>
            <span className="text-lg font-bold">ADHD Hub CMS</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-16 md:mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive(item.path)
                  ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300'
                  : 'text-warm-600 dark:text-warm-400 hover:bg-warm-50 dark:hover:bg-warm-800'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-warm-100 dark:border-warm-800 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-warm-500 hover:text-brand-600 dark:hover:text-brand-400">
             Wróć do portalu
          </Link>
          <button 
            onClick={() => { toggleTheme(); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-warm-500 hover:bg-warm-50 dark:hover:bg-warm-800 rounded-xl"
          >
             {isDark ? 'Tryb jasny' : 'Tryb ciemny'}
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
          >
            <LogOut size={20} />
            Wyloguj
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;