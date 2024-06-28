import { customers, users } from '@/constants/data';
import { ProductClient } from '@/components/tables/product-tables/client';
import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/product-tables/columns';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ProductTable } from '@/components/tables/product-tables/product-table';
import { DataTable } from '@/components/ui/data-table';

const breadcrumbItems = [{ title: 'Products', link: '/dashboard/product' }];

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

  const res = await fetch(`http://localhost:3000/api/products`,{ cache: 'no-cache' });
  const productRes = await res.json();
  const totalUsers = productRes.data.length; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const product: Product[] = productRes.data;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Product (${totalUsers})`}
            description="Manage products (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/product/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <ProductTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={product}
          pageCount={pageCount}
        />
         {/* <ProductClient data={product} /> */}
      </div>
    </>
  );
}