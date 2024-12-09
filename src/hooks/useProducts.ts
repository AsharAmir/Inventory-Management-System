// src/hooks/useProducts.ts

import { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export interface Product {
  _id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  reorderPoint: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      if (auth.currentUser) {
        const response = await productApi.getAll();
        setProducts(response.data);
        setError(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string) => {
    try {
      const response = await productApi.search(query);
      setProducts(response.data);
    } catch (err) {
      toast.error('Failed to search products');
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchProducts();
    }
  }, [auth.currentUser]);

  return {
    products,
    loading,
    error,
    refreshProducts: fetchProducts,
    searchProducts
  };
};