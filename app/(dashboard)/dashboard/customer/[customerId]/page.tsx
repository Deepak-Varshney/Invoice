import BreadCrumb from '@/components/breadcrumb';
import { CustomerForm } from '@/components/forms/customer-form';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'Customer', link: '/dashboard/customer' },
    { title: 'Create', link: '/dashboard/customer/create' }
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <CustomerForm
        initialData={null}
        key={null}
      />
    </div>
  );
}
