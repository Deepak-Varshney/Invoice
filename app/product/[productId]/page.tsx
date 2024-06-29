'use client'
import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const { productId } = useParams(); // Get the productId from the dynamic route
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (productId) {
      // Fetch product details by productId
      axios.get(`/api/products/${productId}`)
        .then(response => {
          setInitialData(response.data); // Set the fetched product data as initialData
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
          setLoading(false);
        });
    }
  }, [productId]);

  const breadcrumbItems = [
    { title: 'Products', link: '/dashboard/product' },
    { title: initialData ? 'Edit Product' : 'Create Product', link: `/dashboard/product/${productId}` }
  ];

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProductForm initialData={initialData} key={initialData ? initialData.data.name : undefined} />
    </div>
  );
}
