import { useState } from "react";
import { TableComponent } from "../../../components/TableComponent"
import { columns_productos } from "../hook/Tables"
import { useEffect } from "react";
import { FormPerson } from "./FormPerson";
import { FormProduct } from "./FormProduct";

export const Productos = () => {
    const [data, setData] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:3000/getTable', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ table: 'producto' })
          })
        const json = await response.json()
        //Formatear fecha
        json.result.forEach((element) => {
            const date = new Date(element.fecha_nacimiento);
            element.fecha_nacimiento = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        });
        setData(json.result)

        if (response.ok) {
            await getData()
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
        <div className="flex flex-col w-[90%] h-[90%] min-h-[400px] bg-linear-to-t from-[#f0f0f0] to-[#FFF] rounded-lg shadow-lg overflow-y-auto">
            
            <div className="bg-gray-100 px-[100px] py-[50px]  ">
                <div className="flex items-center w-full">
                    <h1 className="text-3xl font-bold text-gray-800"> Información Cliente </h1>
                </div>
                
                <div className="flex justify-center pt-10">
                    <FormProduct tableName={ 'producto' } />
                </div>
            </div>
            
        </div>
        <TableComponent columna={ columns_productos } data={ data } />
        </>
            
    )
}