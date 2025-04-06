import { Button, Input } from "@material-tailwind/react";
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table";
import { useState } from "react";
export function TableComponent({columna, data}) {
    const [filter, setFilter] = useState("");
    const columns = columna
    const table = useReactTable({data, 
                                columns, 
                                getCoreRowModel: getCoreRowModel(), 
                                getFilteredRowModel: getFilteredRowModel(), 
                                state: { globalFilter: filter},
                                onGlobalFilterChange: setFilter,
                                }
                            
                            );


    return(
        <div className="flex flex-col w-[90%] h-[90%] min-h-[400px] px-[100px] py-[50px] bg-linear-to-t from-[#f0f0f0] to-[#FFF] rounded-2xl rounded-l-none shadow-lg overflow-hidden">
            <section className="flex w-full justify-between items-center">
                <div className="flex items-center w-full">
                    <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
                </div>
                <div className="flex items-center justify-end space-x-5">
                    <div className="flex items-center justify-end w-full">
                        <Input 
                        onChange={(e) => setFilter(e.target.value)}
                        type="text" 
                        variant="outlined" 
                        size="lg" 
                        placeholder="Buscar" 
                        className="border-gray-300"/>
                    </div>
                    <div className="flex items-center justify-end">
                        <Button className="flex items-center justify-center w-[100px] bg-[#7BA8FF] text-white px-[15px] py-[10px] rounded-[5px] cursor-pointer shadow-none">+ Producto</Button>
                    </div>
                </div>
            </section>

            <div className="flex justify-center w-full overflow-auto mt-[20px] border border-gray-200 rounded-lg shadow-lg">
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
            </div>
            <div className="flex w-[500px] items-center gap-2">
                <span className="text-gray-600">Total de registros: {table.getRowModel().rows.length}</span>
            </div>
        </div>
    )
}