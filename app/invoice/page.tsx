import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/invoice-tables/columns';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { IInvoice } from '@/types/invoice';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Invoice,} from '@/constants/data';
import { InvoiceClient } from '@/components/tables/invoice-tables/client';
import { InvoiceTable } from '@/components/tables/invoice-tables/invoice-table';


const breadcrumbItems = [{ title: 'Invoice', link: '/dashboard/invoice' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch('http://localhost:3000/api/invoices');

  const invoiceRes = await res.json();
  const totalUsers = invoiceRes.data.length; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const invoice: Invoice[] = invoiceRes.data;

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <InvoiceClient data={invoice} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Invoices (${totalUsers})`}
            description="Manage Invoices (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/invoice/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <InvoiceTable
          searchKey="id"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={invoice}
          pageCount={pageCount}

        />
      </div>
    </>
  );
}