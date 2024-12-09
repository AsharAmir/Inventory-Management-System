// src/hooks/useSuppliers.ts

import { useState, useEffect } from 'react';
import { supplierApi } from '../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export interface Supplier {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  products: Array<{
    name: string;
    category: string;
    price: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await supplierApi.getAll();
      setSuppliers(response.data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch suppliers';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const searchSuppliers = async (query: string) => {
    try {
      const response = await supplierApi.search(query);
      setSuppliers(response.data);
    } catch (err) {
      toast.error('Failed to search suppliers');
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchSuppliers();
    }
  }, [auth.currentUser]);

  return {
    suppliers,
    loading,
    error,
    refreshSuppliers: fetchSuppliers,
    searchSuppliers
  };
};