import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
export function TableComponent({columna, data}) {
    const columns = columna
    const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()});

    return(
        <div className="w-full">
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="border border-gray-200 px-4 py-2">
                                    {header.column.columnDef.header}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className="border border-gray-200 px-4 py-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}