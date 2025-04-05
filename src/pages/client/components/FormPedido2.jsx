export function FormPedido2() {
    return(
        <div class="flex flex-col pb-5 w-full ">
            <h2 class="text-base/7 font-semibold text-gray-900">Bienvenido,</h2>
            <p class="mt-1 text-sm/3 text-gray-600">Actualice sus datos si es necesario</p>

            <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 justify-items-normal border-spacing-y-2  ">
                
                {/*Bloque de nombre, apellido fecha de nacimiento*/ }
                <div class= "grid grid-cols-2 gap-2 p-4 rounded-md ">
                    
                    
                    <div class="sm:col-span-2  ">
                        <label for="ID" class="block text-sm/6 font-medium text-gray-900">Numero de Identificacion:</label>
                        <div class="mt-2">
                            <input type="text" name="Nombre" id="first-name" autocomplete=" given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                    </div>
                    
                    <div class="sm:col-span-1 sm:col-start-1 ">
                        <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Nombre:</label>
                        <div class="mt-2">
                            <input type="text" name="Nombre" id="first-name" autocomplete=" given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                    </div>

                    <div class="sm:col-span-1 sm:col-start-2">
                        <label for="Apellidos" class="block text-sm/6 font-medium text-gray-900 ">Apellido:</label>
                        <div class="mt-2">
                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label htmlFor="lbl_fechaNacimiento" class="block text-sm/6 font-medium text-gray-900"> Fecha de Nacimiento: </label>
                        <div>
                            <input type="date" id= "fecha_nacimiento" name="fecha_nacimiento"  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                    </div>
                    {/*Fecha de nacimiento*/}
                    

                </div>
                
                <div class= "grid grid-cols-2 gap-2  p-4 rounded-md ">
                    
                    <div class="sm:col-span-2 sm:col-start-1">
                        <label for="ciudad" class="block text-sm/6 font-medium text-gray-900">Ciudad:</label>
                        <div class="mt-2 grid grid-cols-1">
                            <select id="ciudad" name="ciudad" autocomplete="nombre-ciudad" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option>Barranquilla</option>
                                <option>Bogotá</option>
                                <option>Medellin</option>
                                <option>Cartagena</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:col-span-1 sm:col-start-1">
                        <label for="tipoVia" class="block text-sm/6 font-medium text-gray-900">Tipo de Vía:</label>
                        <div class="mt-2 grid grid-cols-1">
                            <select id="Tipo_via" name="Tipo_via" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option>None</option>
                                <option>Calle</option>
                                <option>Cra</option>
                                <option>Troncal</option>
                                <option>Diagonal</option>
                                <option>Transversal</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:col-span-1 sm:col-start-2">
                        <label for="" class="block text-sm/6 font-medium text-gray-900">Numero de Direccion:</label>
                        <div class="mt-2">
                            <input type="text" name="num_direccion" id="num_direccion" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="Edad" class="block text-sm/6 font-medium text-gray-900">Edad:</label>
                        <div>
                            <input type="text" name="Edad" id="edad" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                    </div>                    
                </div>
                
                <div class="sm:col-span-4 mt-6 flex items-center justify-end gap-x-6 justify-items-end pr-20">
                    
                    <button type="submit" class="rounded-md bg-[#7BA8FF] px-15 py-2 text-white font-semibold hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    
                    >Actualizar</button>
                </div>

                
            </div>
    </div>
    )
}