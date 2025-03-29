'use client';

import {
  flexRender,
  Table as ReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData>[];
}

const DataTable = <TData,>({ table, columns }: DataTableProps<TData>) => {
  return (
    <div className='border rounded-lg overflow-hidden'>
      <Table className='w-full'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='text-center py-4'>
                Данные отсутствуют
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className='flex justify-between items-center p-4 border-t'>
        <Button
          variant='outline'
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Назад
        </Button>
        <span>
          Страница {table.getState().pagination.pageIndex + 1} из{' '}
          {table.getPageCount()}
        </span>
        <Button
          variant='outline'
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Вперед
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
