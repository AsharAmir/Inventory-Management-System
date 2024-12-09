// src/App.tsx

import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import SupplierManagement from './pages/admin/SupplierManagement';
import ProductManagement from './pages/admin/ProductManagement';
import ReportsManagement from './pages/admin/ReportsManagement';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="suppliers" element={<SupplierManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="reports" element={<ReportsManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </AuthProvider>
  );
}