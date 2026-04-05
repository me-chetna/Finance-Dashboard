import React from 'react';
import { Menu, Moon, Sun, User, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, userRole, setUserRole, toggleSidebar } = useApp();
  
  const handleRoleToggle = () => {
    const newRole = userRole === 'admin' ? 'viewer' : 'admin';
    setUserRole(newRole);
    toast.success(
      newRole === 'admin' 
        ? '🛡️ Switched to Admin mode - You can now add, edit, and delete transactions' 
        : '👤 Switched to Viewer mode - View-only access'
    );
  };
  
  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Finance Dashboard
            </h1>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          
          {/* Role Toggle Button */}
          <Button 
            variant="outline" 
            onClick={handleRoleToggle}
            className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {userRole === 'admin' ? (
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
            <span className="hidden sm:inline font-medium">
              {userRole === 'admin' ? 'Admin' : 'Viewer'}
            </span>
            <Badge
              variant={userRole === 'admin' ? 'default' : 'secondary'}
              className="ml-1"
            >
              {userRole}
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
};