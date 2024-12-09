// src/components/layout/AdminLayout.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <nav className="mt-5 px-2">
          <AdminNavLink to="/admin/dashboard" icon={Home}>
            Dashboard
          </AdminNavLink>
          <AdminNavLink to="/admin/users" icon={Users}>
            User Management
          </AdminNavLink>
          <AdminNavLink to="/admin/suppliers" icon={Truck}>
            Supplier Management
          </AdminNavLink>
          <AdminNavLink to="/admin/products" icon={Box}>
            Product Management
          </AdminNavLink>
          <AdminNavLink to="/admin/reports" icon={FileText}>
            Reports
          </AdminNavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;