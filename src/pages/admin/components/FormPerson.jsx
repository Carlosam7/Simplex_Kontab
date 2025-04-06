import React, { useState } from 'react';

export function FormPerson({ tableName }) {
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

    const [modo, setModo] = useState(''); // agregar, actualizar, eliminar
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
    //CONSULTA
    const fetchDataById = (id) => {
        console.log(`Buscando datos de ID: ${id}`);
        const mockData = {
            id: id,
            nombre: 'Juan',
            apellido: 'Pérez',
            fecha_nacimiento: '2000-05-15',
            ciudad: 'Barranquilla',
            tipo_via: 'Calle',
            num_direccion: '45B-123',
            edad: calcularEdad('2000-05-15').toString()
        };
        setFormData(mockData);
        if (modo === 'eliminar') {
            setMensaje("Datos cargados para eliminar.");
        } else if (modo === 'actualizar') {
            setMensaje("Datos cargados para actualizar.");}
    };

    const handleBuscar = () => {
        if (!formData.id) {
            setMensaje("Debe ingresar el ID para buscar.");
            return;
        }
        fetchDataById(formData.id);
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
        if (!formData.id) {
            setMensaje("Debe ingresar el ID.");
            return;
        }

        if (modo === 'agregar') {
            if (Object.values(formData).some(val => val === '')) {
                setMensaje("Por favor, complete todos los campos.");
                return;
            }else{
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
            }
            
            setMensaje("Usuario agregado correctamente ✅");
        } else if (modo === 'actualizar') {
            
            setMensaje("Datos actualizados correctamente ✅");
        } else if (modo === 'eliminar') {
            setMensaje("Usuario eliminado correctamente ❌");
            setFormData({
                id: '',
                nombre: '',
                apellido: '',
                fecha_nacimiento: '',
                ciudad: '',
                tipo_via: '',
                num_direccion: '',
                edad: ''
            });
        }
        console.log("Acción:", modo, "Datos:", formData);
    };

    const camposDeshabilitados = {
        id: modo === '',
        nombre: !(modo === 'agregar' || modo === 'actualizar'),
        apellido: !(modo === 'agregar' || modo === 'actualizar'),
        fecha_nacimiento: !(modo === 'agregar' || modo === 'actualizar'),
        ciudad: !(modo === 'agregar' || modo === 'actualizar'),
        tipo_via: !(modo === 'agregar' || modo === 'actualizar'),
        num_direccion: !(modo === 'agregar' || modo === 'actualizar'),
        edad: true
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col pb-5 w-full">
            {/* Botones de Modo */}
            <div className="flex gap-4 mb-5">
                <button type="button" onClick={() => { setModo('agregar'); setFormData({ id: '', nombre: '', apellido: '', fecha_nacimiento: '', ciudad: '', tipo_via: '', num_direccion: '', edad: '' }); setMensaje(''); }}
                    className={`px-4 py-2 rounded-md font-semibold ${modo === 'agregar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    Agregar
                </button>
                <button type="button" onClick={() => { setModo('actualizar'); setFormData({ id: '', nombre: '', apellido: '', fecha_nacimiento: '', ciudad: '', tipo_via: '', num_direccion: '', edad: '' }); setMensaje(''); }}
                    className={`px-4 py-2 rounded-md font-semibold ${modo === 'actualizar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    Actualizar
                </button>
                <button type="button" onClick={() => { setModo('eliminar'); setFormData({ id: '', nombre: '', apellido: '', fecha_nacimiento: '', ciudad: '', tipo_via: '', num_direccion: '', edad: '' }); setMensaje(''); }}
                    className={`px-4 py-2 rounded-md font-semibold ${modo === 'eliminar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    Eliminar
                </button>
            </div>

            {/* Campos del formulario */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 justify-items-normal border-spacing-y-2">
                {/* ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">ID:</label>
                    <input type="text" name="id" value={formData.id} onChange={handleChange}
                        disabled={camposDeshabilitados.id}
                        readOnly={camposDeshabilitados.id}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                        disabled={camposDeshabilitados.nombre}
                        readOnly={camposDeshabilitados.nombre}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                {/* Apellido */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Apellido:</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange}
                        disabled={camposDeshabilitados.apellido}
                        readOnly={camposDeshabilitados.apellido}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                {/* Fecha Nacimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Fecha de nacimiento:</label>
                    <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange}
                        disabled={camposDeshabilitados.fecha_nacimiento}
                        readOnly={camposDeshabilitados.fecha_nacimiento}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                {/* Ciudad */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Ciudad:</label>
                    <select name="ciudad" value={formData.ciudad} onChange={handleChange}
                        disabled={camposDeshabilitados.ciudad}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm">
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

                {/* Tipo de Vía */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Tipo de Vía:</label>
                    <select name="tipo_via" value={formData.tipo_via} onChange={handleChange}
                        disabled={camposDeshabilitados.tipo_via}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm">
                        <option value="">Seleccione tipo</option>
                        <option>Calle</option>
                        <option>Cra</option>
                        <option>Troncal</option>
                        <option>Diagonal</option>
                        <option>Transversal</option>
                    </select>
                </div>

                {/* Número de Dirección */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Número de Dirección:</label>
                    <input type="text" name="num_direccion" value={formData.num_direccion} onChange={handleChange}
                        disabled={camposDeshabilitados.num_direccion}
                        readOnly={camposDeshabilitados.num_direccion}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                {/* Edad */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Edad:</label>
                    <input type="text" name="edad" value={formData.edad} readOnly
                        className="mt-1 block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>
            </div>

            {/* Botón de enviar */}


            {/* Botón de guardar */}
            <div className="mt-6 flex items-center justify-end gap-x-6">

                {modo === 'actualizar' || modo === 'eliminar' ? (
                    <button type="button" onClick={handleBuscar}
                        className="rounded-md bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-500">
                        Buscar
                    </button>
                ) : null}
                <button type="submit" className="rounded-md bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-500">
                    {modo === 'eliminar' ? 'Eliminar' : 'Guardar'}
                </button>
            </div>

            {mensaje && (
                <div className="mt-4 text-sm text-indigo-700 font-semibold">
                    {mensaje}
                </div>
            )}
        </form>
    );
}