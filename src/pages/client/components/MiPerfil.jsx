import { TableComponent } from "../../../components/TableComponent"

import { FormPedido2 } from "./FormPedido2"
import data  from "../hook/MOCK_DATA.json";
export const MiPerfil = ({ columns_productos }) => {
    return(
        <div className="flex flex-col w-[90%] h-[90%] min-h-[400px] bg-linear-to-t from-[#f0f0f0] to-[#FFF] rounded-lg shadow-lg overflow-y-auto">
            <div className="bg-gray-100 px-[100px] py-[50px]  ">
                <div className="flex items-center w-full">
                    <h1 className="text-3xl font-bold text-gray-800"> Informacion Personal </h1>
                </div>
                
                <div className="flex justify-center pt-10">
                    <FormPedido2 tableName={ 'cliente' } />
                </div>
            </div>
        </div>
    )
}