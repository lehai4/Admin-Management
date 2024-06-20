"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { productApiRequest } from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ProductType } from "@/type";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ProductUI = ({ product }: { product: ProductType[] }) => {
  const { toast } = useToast();
  const inputFile = React.useRef<HTMLInputElement>(null);

  const [image, setImage] = useState(null);
  const [file, setFile] = useState<string>();
  const [productArr, setProductArr] = React.useState<ProductType[]>(product);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const data: ProductType[] = productArr;

  const columns: ColumnDef<ProductType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
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
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "picture",
      header: "Picture",
      cell: ({ row }) => (
        <img
          src={
            row.getValue("picture") !== null
              ? `http://${row.getValue("picture")}`
              : "https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4="
          }
          width="60"
          height="60"
        />
        // <Dialog>
        //   <DialogTrigger>

        //   </DialogTrigger>
        //   <DialogContent className="sm:max-w-[425px]">
        //     <DialogHeader>
        //       <DialogTitle>Edit picture</DialogTitle>
        //       <DialogDescription>
        //         Make changes to your picute product here. Click save when you're
        //         done.
        //       </DialogDescription>
        //     </DialogHeader>
        //     <div className="grid gap-4 py-4">
        //       <input
        //         type="file"
        //         accept="image/*"
        //         ref={inputFile}
        //         multiple={false}
        //         onChange={handleChangeImage}
        //       />
        //       {file && <img src={file} />}
        //     </div>
        //     <DialogFooter>
        //       <Button
        //         type="submit"
        //         onClick={() => onUploadPicture(row.getValue("id"))}
        //       >
        //         Save changes
        //       </Button>
        //     </DialogFooter>
        //   </DialogContent>
        // </Dialog>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "basePrice",
      header: () => <div className="text-center">BasePrice</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("basePrice"));

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-center">{formatted}</div>;
      },
    },
    {
      accessorKey: "discountPercentage",
      header: () => <div className="text-center">DiscountPercentage</div>,
      cell: ({ row }) => {
        const disCount = parseFloat(row.getValue("discountPercentage"));

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(disCount);
        return <div className="text-center">{formatted}</div>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("stock")}</div>
      ),
    },
    {
      accessorKey: "categories",
      header: "Categories",
      cell: ({ row }) => {
        const catelog: any = row.getValue("categories");
        return catelog.map((category: { name: string }, index: number) => (
          <p key={index}>{category.name}</p>
        ));
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex flex-row items-center gap-4">
          <Button variant={"edit"} className="flex flex-row gap-1">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant={"destructive"}
            className="flex flex-row gap-1"
            onClick={() => handleDelete(row.getValue("id"))}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const onUploadPicture = async (id: string) => {
    if (!image) {
      toast({
        title: "Error",
        description: "Please choose image for upload",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    setFile(undefined);
    if (inputFile.current) {
      (inputFile.current as any).value = "";
      (inputFile.current as any).type = "text";
      (inputFile.current as any).type = "file";
    }
    await productApiRequest.uploadPicture(id, formData);
  };

  const handleChangeImage = (event: any) => {
    const file = event.target.files[0];
    if (file.size > 3 * 1024 * 1024) {
      alert("Kích thước ảnh vượt quá 3MB.");
      return;
    } else {
      const Blob = URL.createObjectURL(file);
      setFile(Blob);
      setImage(file);
    }
  };
  const handleDelete = async (id: string) => {
    const res = await productApiRequest.deleteProduct(id);
    toast({
      title: "Done!",
      description: res.result.message,
    });
    const product = await productApiRequest.getProduct();
    setProductArr(product?.result);
  };
  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-5">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link href="/product/create">
          <Button>Create Product</Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductUI;
