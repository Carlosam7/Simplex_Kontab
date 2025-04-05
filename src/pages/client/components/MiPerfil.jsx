import { TableComponent } from "../../../components/TableComponent"

export const MiPerfil = ({ columns_productos }) => {
    return(
        <div className="flex flex-col w-[90%] h-[90%] min-h-[400px] px-[100px] py-[50px] bg-linear-to-t from-[#f0f0f0] to-[#FFF] rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center w-full">
                <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
            </div>
            <div className="flex justify-center w-full overflow-auto mt-[20px] border border-gray-200 rounded-lg shadow-lg">
                <TableComponent columna={ columns_productos } data = { NaN } />
            </div>
        </div>
    )
}