'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Invoice } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Invoice>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey:'number',
    header:'INVOICE NUMBER'
  },
  {
    accessorKey: 'customerId',
    header: 'Customer ID'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created AT'
  },
  {
    id: 'actions',
    header:'OPTION',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
