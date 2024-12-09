// src/pages/admin/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Box, Truck, FileText } from 'lucide-react';
import { userApi, supplierApi, productApi } from '../../services/api';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalSuppliers: 0,
    totalProducts: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [users, suppliers, products, approvals] = await Promise.all([
          userApi.getAll(),
          supplierApi.getAll(),
          productApi.getAll(),
          userApi.getPendingApprovals()
        ]);

        setMetrics({
          totalUsers: users.data.length,
          totalSuppliers: suppliers.data.length,
          totalProducts: products.data.length,
          pendingApprovals: approvals.data.length
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={Users}
          color="bg-blue-500"
        />
        <MetricCard
          title="Total Suppliers"
          value={metrics.totalSuppliers}
          icon={Truck}
          color="bg-green-500"
        />
        <MetricCard
          title="Total Products"
          value={metrics.totalProducts}
          icon={Box}
          color="bg-purple-500"
        />
        <MetricCard
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          icon={FileText}
          color="bg-yellow-500"
        />
      </div>
    </motion.div>
  );
};

export default AdminDashboard;