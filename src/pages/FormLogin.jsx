import { Link } from "react-router-dom"
import { logoSoftware, txtInput } from "../components/ComponentsForm"
import { ButtonMateDark, CheckboxRippleEffect } from "../components/buttons"


export const FormLogin = ({admin}) =>{

    const iniciarSesion = async (e) => {
        e.preventDefault()
        const user = document.getElementById('txtUserL').value
        const password = document.getElementById('txtPasswordL').value

        if(user === admin.name && password === admin.password){
            alert('Bienvenido')
            // Redireccionar a la página de administración
            window.location.href = '/admin'
        }else{
            // Redireccionar a la página de cliente
            window.location.href = '/client'
        }
    }

    return(
        <>
        <div className='  flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F5F5] to-[#D0DDFF] min-w-[280px] min-h-screen p-5'>
            <main className="flex flex-col items-center justify-center w-full text-center">
                <div className='bg-[#FAFAFF] relative rounded-[3px] shadow-[0px_0px_70px_10px_rgba(0,0,0,0.1)] w-[45%] min-w-[300px] flex md:w-[400px] lg:w-[1000px] xl:w-[1024px] h-[450px] md:h-[550px] lg:h-[600px] min-h-[450px] max-h-[1080px] max-w-[1700px]'>
                    <div className='flex flex-col w-full h-full p-7 lg:w-[40%] items-center z-10'>

                        <section className="w-full flex justify-between items-center m-[15px]">
                            <div title="Atrás">
                                <button type="button" className="w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[2rem] lg:h-[2rem] bg-[url('./assets/img/icons/Back_2.png')] bg-cover"></button>
                            </div>

                            <div>
                                <p className="flex text-[13px] md:text-[15px] xl:text-[14px] font-[nunito-sans-light] hover:text-[#0094FF]"><Link to='/formRegister'>Registrarse</Link></p>
                            </div>
                        </section>

                        <form onSubmit={iniciarSesion} className="relative h-full w-full flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center justify-center w-full mb-5">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="bg-[url('./src/assets/img/logo/Logo.png')] bg-cover w-[35px] h-[35px] md:w-[40px] md:h-[40px] xl:w-[3.3rem] xl:h-[3.2rem] rounded"></div>
                                    {logoSoftware()}
                                </div>
                                <p className="flex text-[15px] md:text-[1.5rem] xl:text-[1.3rem] text-center font-[nunito-sans] mt-5">Inicia sesión</p>
                            </div>                            

                            <section className="flex flex-col items-center justify-center w-full px-[1.5vh]">

                                <div className="relative flex flex-col items-center w-[90%] md:w-[80%] mb-[1rem] lg:mb-[1rem]">
                                    {txtInput("txtUserL", "text", "Usuario", true)}
                                </div>

                                <div className="relative flex flex-col items-center w-[90%] md:w-[80%] mb-3">
                                    {txtInput("txtPasswordL", "password", "Contraseña", true)}
                                </div>

                            </section>

                            <section className="w-[90%] md:w-[80%] min-w-[200px] flex items-center justify-between">

                                {CheckboxRippleEffect()}
                                <div className="items-end text-right pr-3">
                                    <p className="flex flex-col font-[nunito-sans-light] text-[11px] md:text-[12px] xl:text-[1.1rem] text-[#5F6A85] hover:text-[#0094FF] text-right"><a href="#">¿Olvidaste contraseña?</a></p>
                                </div>

                            </section>


                            <section className="w-[95%] md:w-[85%] flex items-center justify-center mt-12">
                                {ButtonMateDark ('Ingresar', 'iniciarSesion', 'submit')}
                            </section>
                            
                        </form>
                    </div> {/*Inicio de sesión*/}
                    <div className="hidden lg:flex flex-col z-20 absolute bottom-0 right-0 lg:w-[60%] h-[100%] rounded-r-[3px] text-white items-center justify-start bg-[url('./src/assets/img/fondos/fondoKontab.png')] bg-cover bg-no-repeat bg-center">
                    </div>
                </div>
            </main>
        </div>
        </>
    )
}