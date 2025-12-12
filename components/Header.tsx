import React from 'react';
import { Brain, BookOpen, PenTool, MessageCircle, Moon, Sun, User as UserIcon, Shield, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();

  // Hide public header on admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  const navItems = [
    { label: 'Wiedza', path: '/knowledge', icon: BookOpen },
    { label: 'Narzędzia', path: '/tools', icon: PenTool },
    { label: 'Społeczność', path: '/community', icon: MessageCircle },
    { label: 'Diagnoza', path: '/diagnosis', icon: Brain },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (isAdminRoute) return null;

  return (
    <header className="sticky top-0 z-50 bg-warm-50/90 dark:bg-warm-950/90 backdrop-blur-md border-b border-warm-200 dark:border-warm-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="ADHD Hub PL" 
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Nav - Hidden on Mobile */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 px-3 py-1.5 rounded-full'
                      : 'text-warm-800 dark:text-warm-300 hover:text-brand-600 dark:hover:text-brand-400'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 border-l border-warm-200 dark:border-warm-800 pl-4 ml-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-warm-600 dark:text-warm-400 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors focus:outline-none"
                aria-label={isDark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* User Profile / Login */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-warm-300 dark:border-warm-700" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center">
                        <UserIcon size={18} />
                      </div>
                    )}
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-warm-900 rounded-xl shadow-lg border border-warm-200 dark:border-warm-800 py-1 hidden group-hover:block animate-fade-in z-50">
                    <div className="px-4 py-2 border-b border-warm-100 dark:border-warm-800">
                      <p className="text-sm font-bold text-warm-900 dark:text-warm-100">{user.name}</p>
                      <p className="text-xs text-warm-500 truncate">{user.email}</p>
                    </div>
                    
                    {user.role === 'ADMIN' && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 font-medium"
                      >
                        Panel Administratora
                      </Link>
                    )}

                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Wyloguj się
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => login(false)}
                    className="flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 bg-brand-50 dark:bg-brand-900/20 px-3 py-1.5 rounded-full md:bg-transparent md:px-0"
                  >
                    <UserIcon size={18} />
                    <span className="hidden md:inline">Zaloguj</span>
                    <span className="md:hidden text-xs">Login</span>
                  </button>
                  {/* Admin Shortcut */}
                  <button
                     onClick={() => login(true)}
                     className="p-1.5 rounded text-warm-300 hover:text-warm-500"
                     title="Admin Login (Demo)"
                  >
                     <Shield size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;