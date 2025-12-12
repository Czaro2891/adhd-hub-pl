import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenTool, MessageCircle, Brain } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Hide on desktop or admin routes
  if (isAdminRoute) return null;

  const navItems = [
    { label: 'Start', path: '/', icon: Home },
    { label: 'Wiedza', path: '/knowledge', icon: BookOpen },
    { label: 'Narzędzia', path: '/tools', icon: PenTool },
    { label: 'Forum', path: '/community', icon: MessageCircle },
    { label: 'Diagnoza', path: '/diagnosis', icon: Brain },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-warm-950/90 backdrop-blur-lg border-t border-warm-200 dark:border-warm-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 ${
                isActive 
                  ? 'text-brand-600 dark:text-brand-400' 
                  : 'text-warm-400 dark:text-warm-500 hover:text-warm-600 dark:hover:text-warm-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-brand-50 dark:bg-brand-900/20 translate-y-[-2px]' : ''}`}>
                <item.icon 
                  size={isActive ? 24 : 22} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
              </div>
              <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;