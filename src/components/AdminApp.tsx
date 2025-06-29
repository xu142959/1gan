import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminNavbar from './AdminNavbar';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

interface AdminAppProps {
  onBackToHome: () => void;
}

const AdminApp: React.FC<AdminAppProps> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  const handleLoginSuccess = (user: any) => {
    setIsAuthenticated(true);
    setAdminUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {!isAuthenticated ? (
        <AdminLogin 
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={onBackToHome}
        />
      ) : (
        <>
          <AdminNavbar 
            adminUser={adminUser}
            onLogout={handleLogout}
            onBackToHome={onBackToHome}
          />
          <div className="pt-16">
            <AdminDashboard onBackToHome={onBackToHome} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminApp;