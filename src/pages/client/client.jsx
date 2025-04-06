import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { ShowPages } from "./hook/ShowPages";

export const Client = () => {

    const [page, setPage] = useState("Inicio");
    function handlePageChange(newPage) {
        setPage(newPage);
    }
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#F0F0F0]">
        <div className="absolute top-0 flex items-center justify-between w-full h-[70px] bg-[#FBFCFF] border-b-1 border-[#b0b0b0] px-[50px]">
            <div className="flex items-center w-[full] space-x-20">
                <section className="flex items-center space-x-4">
                    <div className="w-[40px] h-[40px] bg-[url('./src/assets/img/logo/Logotipo.png')] bg-cover" />
                    <h1 className="text-2xl font-bold text-gray-800">Cejtech</h1>
                </section>

                <section className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-[100px] h-[70px] hover:bg-[#F0F0F0]">
                    <Button onClick={()=>{handlePageChange('Ayuda')}} className="text-gray-600 hover:text-[#7BA8FF] w-full h-[70px] shadow-none">Inicio</Button>
                    </div>
                    <div className="flex items-center justify-center w-[100px] h-[70px] hover:bg-[#F0F0F0]">
                    <Button onClick={()=>{handlePageChange('Mi perfil')}} className="text-gray-600 hover:text-[#7BA8FF] w-full h-[70px] shadow-none">Mi perfil</Button>
                    </div>
                    
                    <div className="flex items-center justify-center w-[100px] h-[70px] hover:bg-[#F0F0F0]">
                    <Button onClick={()=>{handlePageChange('Ayuda')}} className="text-gray-600 hover:text-[#7BA8FF] w-full h-[70px] shadow-none">Ayuda</Button>
                    </div>

                </section>
                
            </div>
            <div className="flex items-center">
                <Button className="flex bg-[#7BA8FF] text-white px-[15px] py-[10px] rounded-[5px] cursor-pointer">Logout</Button>
            </div>
        </div>
        <div className="flex items-end justify-center w-full h-screen p-[50px] bg-[#F0F0F0]">
            {ShowPages(page)}
        </div>
        
    </div>       
    </>   
  )
}