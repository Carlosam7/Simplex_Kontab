import React, { useState } from 'react';


export function FormPedido2( { tableName }) {
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        ciudad: '',
        tipo_via: '',
        num_direccion: '',
        edad: ''
    });

    const [mensaje, setMensaje] = useState('');

    const calcularEdad = (fecha) => {
        const hoy = new Date();
        const nacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si cambia la fecha de nacimiento, calculamos edad automáticamente
        if (name === "fecha_nacimiento") {
            const edadCalculada = calcularEdad(value);
            setFormData(prev => ({
                ...prev,
                fecha_nacimiento: value,
                edad: edadCalculada.toString()
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id_cliente: formData.id,
            nombre: formData.nombre,
            apellidos: formData.apellido,
            fecha_nacimiento: formData.fecha_nacimiento,
            direccion: formData.tipo_via + " " + formData.num_direccion + " " + formData.ciudad,
        };
        if (!formData.id || !formData.nombre || !formData.apellido || !formData.fecha_nacimiento || !formData.ciudad || !formData.tipo_via || !formData.num_direccion || !formData.edad) {
            setMensaje("Por favor, complete todos los campos.");
            return;
        }

        if (isNaN(formData.id)) {
            setMensaje("El número de identificación debe ser numérico.");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/insert', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ table: tableName, data: data })
            })
        
            const result = await response.json()
        
            if (response.status != 201){
                throw new Error('No se insertaron datos en la tabla')
            }
        
            console.log('🟢 Insertado con éxito:', result)
            alert('¡Datos insertados con éxito, llave! 🎉')
            } catch (error) {
            alert('Error al insertar. Verifique que no exista un dato con esta llave primaria')
            console.error('🔴 Error al insertar:', error)
            }

        setMensaje("Datos actualizados correctamente ✅");
        console.log("Datos enviados:", data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col pb-5 w-full">
            <h2 className="text-base/7 font-semibold text-gray-900">Bienvenido,</h2>
            <p className="mt-1 text-sm/3 text-gray-600">Actualice sus datos si es necesario</p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 justify-items-normal border-spacing-y-2">
                <div className="grid grid-cols-2 gap-2 p-4 rounded-md">
                    <div className="sm:col-span-2">
                        <label htmlFor="ID" className="block text-sm/6 font-medium text-gray-900">Numero de Identificacion:</label>
                        <div className="mt-2">
                            <input type="text" name="id" id="first-name" value={formData.id} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-1 sm:col-start-1">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">Nombre:</label>
                        <div className="mt-2">
                            <input type="text" name="nombre" id="first-name" value={formData.nombre} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-1 sm:col-start-2">
                        <label htmlFor="Apellidos" className="block text-sm/6 font-medium text-gray-900">Apellido:</label>
                        <div className="mt-2">
                            <input type="text" name="apellido" id="last-name" value={formData.apellido} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="lbl_fechaNacimiento" className="block text-sm/6 font-medium text-gray-900">Fecha de Nacimiento:</label>
                        <div>
                            <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-4 rounded-md">
                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="ciudad" className="block text-sm/6 font-medium text-gray-900">Ciudad:</label>
                        <div className="mt-2 grid grid-cols-1">
                            <select id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option value="">Seleccione ciudad</option>
                                <option>Barranquilla</option>
                                <option>Bogotá</option>
                                <option>Medellín</option>
                                <option>Cartagena</option>
                                <option>Cali</option>
                                <option>Bucaramanga</option>
                                <option>Santa Marta</option>
                                <option>Manizales</option>
                                <option>Pereira</option>
                                <option>Armenia</option>
                                <option>Neiva</option>
                                <option>Villavicencio</option>
                                <option>Montería</option>
                                <option>Popayán</option>
                                <option>Pasto</option>
                                <option>Cúcuta</option>
                                <option>Ibagué</option>
                                <option>Sincelejo</option>
                                <option>Valledupar</option>
                                <option>Riohacha</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-1 sm:col-start-1">
                        <label htmlFor="tipoVia" className="block text-sm/6 font-medium text-gray-900">Tipo de Vía:</label>
                        <div className="mt-2 grid grid-cols-1">
                            <select id="Tipo_via" name="tipo_via" value={formData.tipo_via} onChange={handleChange} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option value="">Seleccione tipo</option>
                                <option>Calle</option>
                                <option>Cra</option>
                                <option>Troncal</option>
                                <option>Diagonal</option>
                                <option>Transversal</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-1 sm:col-start-2">
                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">Numero de Direccion:</label>
                        <div className="mt-2">
                            <input type="text" name="num_direccion" id="num_direccion" value={formData.num_direccion} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="Edad" className="block text-sm/6 font-medium text-gray-900">Edad:</label>
                        <div>
                            <input type="text" name="edad" id="edad" value={formData.edad} readOnly className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-4 mt-6 flex items-center justify-end gap-x-6 justify-items-end pr-20">
                    <button type="submit" className="rounded-md bg-[#7BA8FF] px-15 py-2 text-white font-semibold hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Actualizar
                    </button>
                </div>

                {mensaje && (
                    <div className="sm:col-span-2 px-6 text-sm text-indigo-700 font-semibold">
                        {mensaje}
                    </div>
                )}
            </div>
        </form>
    );
}