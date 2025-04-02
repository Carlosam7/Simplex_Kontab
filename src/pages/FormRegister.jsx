import { logoSoftware, txtInput } from "../components/ComponentsForm";
import { ButtonMateDark } from "../components/buttons";
import { Link } from "react-router-dom";

export const FormRegister = () => {
    return(
        <>
        <div className='  flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F5F5] to-[#D0DDFF] min-w-[280px] min-h-screen p-5'>
            <div className='bg-[#FAFAFF] relative rounded-[3px] shadow-[0px_0px_70px_10px_rgba(0,0,0,0.1)] w-[45%] min-w-[300px] flex md:w-[400px] lg:w-[1000px] xl:w-[1024px] h-[450px] md:h-[550px] lg:h-[600px] min-h-[450px] max-h-[1080px] max-w-[1700px]'>
                <div className="flex flex-col w-full h-full p-7 lg:w-[40%] rounded-md items-center">
                    <section className="relative h-full w-full flex flex-col items-center justify-start space-y-10">
                        <section className="w-full flex justify-between items-center m-[15px] md:mb-14">
                            <div title="Atrás">
                                <button type="button" className="w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[2rem] lg:h-[2rem] bg-[url('./assets/img/icons/Back_2.png')] bg-cover"></button>
                            </div>
                            <div>
                                <p className="flex text-[13px] sm:text-[15px] md:text-[1.4rem] xl:text-[1.3rem] mx-5 font-[nunito-sans-light] hover:text-[#0094FF]"><Link to="/formLogin" className="flex">Iniciar sesión</Link></p>
                            </div>
                        </section>
                        <div className="flex flex-col items-center justify-center w-full">
                            <div className="flex items-center justify-center space-x-4">
                                <div className="bg-[url('/src/assets/img/logo/Logo.png')] bg-cover w-[35px] h-[35px] md:w-[40px] md:h-[40px] xl:w-[3.3rem] xl:h-[3.2rem] rounded"></div>
                                    {logoSoftware()}
                                </div>
                                <p className="flex text-[15px] md:text-[1.5rem] xl:text-[1.3rem] text-center mt-5 m-2 font-[nunito-sans]">Registro</p>
                            </div>               

                        <form className="relative w-full contents">
                            
                            
                            <div id="item1" className="relative w-full">    
                                <p className="flex text-[15px] xl:text-[1.2rem] px-[2rem] md:px-14 text-center font-[nunito-sans]">Información del usuario</p>
                                <section className="flex flex-col items-center justify-center w-full px-[1.5vh]">

                                    <div className="relative flex flex-col items-center w-[90%] md:w-[80%] mb-2">
                                        {txtInput("txtIdeR", "number", "Identificación", true)}
                                    </div>

                                    <div className="relative flex flex-col items-center w-[90%] md:w-[80%] mb-2">
                                        {txtInput("txtNombreR", "text", "Nombre", true)}
                                    </div>

                                    <div className="relative flex flex-col items-center w-[90%] md:w-[80%] mb-2">
                                        {txtInput("txtUserR", "text", "Usuario", true)}
                                    </div>

                                    <div className="relative flex flex-col items-center w-[90%] md:w-[80%]">
                                        {txtInput("txtPasswordR", "password", "Contraseña", true)}
                                    </div>

                                </section>
                            </div>
                            <div className="flex justify-center w-[85%] mt-10 mb-5">
                                {ButtonMateDark("Crear cuenta", "btnCrearCuentaR", "submit")}
                            </div>
                        </form>
                    </section>
                </div>
                <div className="hidden lg:flex flex-col z-20 absolute bottom-0 right-0 lg:w-[60%] h-[100%] rounded-r-[3px] text-white items-center justify-start bg-[url('./src/assets/img/fondos/fondoKontab.png')] bg-cover bg-no-repeat bg-center"/>
            </div>
        </div>
        </>
    )
}