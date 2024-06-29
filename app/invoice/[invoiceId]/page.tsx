import BreadCrumb from '@/components/breadcrumb';
import { CustomerForm } from '@/components/forms/customer-form';
import { AddInvoiceForm } from '@/components/tables/my-table/my-form/my-form';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'Invoice', link: '/dashboard/invoice' },
    { title: 'Create', link: '/dashboard/invoice/create' }
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <ScrollArea className='h-[calc(80vh-5px)]'>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center justify-between">
        <Heading title="Create Invoice" description="Add a new Invoice" />
        
      </div>
      <Separator/>

      <ScrollArea className="h-[calc(80vh-10px)] rounded-md border">
      {/* <CustomerForm
        initialData={null}
        key={null}
      /> */}
      <AddInvoiceForm/>
      </ScrollArea>
      </ScrollArea>
    </div>
  );
}
