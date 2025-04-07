import React, { useState } from 'react';

export function FormProveedor() {
    const [formData, setFormData] = useState({
        nit: '',
        nombre: '',
        direccion: '',
    });

    const [modo, setModo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBuscar = async () => {
        console.log(formData)
        if (formData.id === '') {
            setMensaje("Debe ingresar el nit para buscar.");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/searchOnDB', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ table: 'proveedor', PK: 'nit', PKValue: formData.nit })
            })
            const data = await response.json()
            if (data.length > 0) {
                setFormData(data[0]);
                setMensaje('');
            } else {
                setFormData({
                    nit: '',
                    nombre: '',
                    direccion: '',
                });
                setMensaje('El proveedor no se encontró en la base de datos.');
            }
            } catch (error) {
            console.error('❌ Error a nivel de frontend:', error)
            }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nit) {
            setMensaje("Debe ingresar el nit.");
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
                        body: JSON.stringify({ table: 'proveedor', data: formData })
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
            console.log(formData)
            if (formData.nit === '') {
                setMensaje("No se encontró el proveedor con el nit proporcionado.");
                alert(mensaje);
                return;
            
            }else{
                try {
                    console.log('Datos a actualizar:', )
                    let response
                    for (let i = 1; i < Object.keys(formData).length; i++) {
                        response = await fetch('http://localhost:3000/updateTable', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        
                        body: JSON.stringify({ table: 'proveedor', column: Object.keys(formData)[i], newColumnValue: formData[Object.keys(formData)[i]] , primaryKey: 'nit', PKValue: formData.nit })
                    })
                    }
                    console.log('🟢 Insertado con éxito:')
                    alert('¡Datos actualizados con éxito, llave! 🎉')
                    setFormData({
                        nit: '',
                        nombre: '',
                        direccion: '',
                    })
                }catch (error) {
                    alert('Error al insertar. Verifique que no exista un dato con esta llave primaria')
                    console.error('🔴 Error al insertar:', error)
                }
            }
        } else if (modo === 'eliminar') {
            if (formData.nit === '') {
                setMensaje("No se encontró el proveedor con el nit proporcionado.");
                alert(mensaje);
                return;
            }else{
                try{
                    const response = await fetch('http://localhost:3000/deleteFromTable', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ table: 'proveedor', PK: 'nit', PKValue: formData.nit })
                    })
                
                    const result = await response.json()
                
                    if (response.status != 200){
                        throw new Error('No se eliminaron datos en la tabla')
                    }else{
                        console.log('🟢 Eliminado con éxito:', result)
                        alert('¡Datos eliminados con éxito, llave! 🎉')
                    }
                }catch (error) {
                    alert('Error al eliminar. Verifique que no exista un dato con esta llave primaria')
                    console.error('🔴 Error al eliminar:', error)
                }
            }
            setFormData({
                nit: '',
                nombre: '',
                direccion: '',
            });
        }
        console.log("Acción:", modo, "Datos:", formData);
    };

    const camposDeshabilitados = {
        nit: modo === '',
        nombre: !(modo === 'agregar' || modo === 'actualizar'),
        direccion: !(modo === 'agregar' || modo === 'actualizar'),
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col pb-5 w-full">
            {/* Botones de Modo */}
            <div className="flex gap-4 mb-5">

                <button type="button" onClick={() => { setModo('agregar'); setFormData({ nit: '', nombre: '', direccion: ''}); setMensaje(''); }}
                    className={`px-4 py-2 rounded-md font-semibold ${modo === 'agregar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    Agregar
                </button>

                <button type="button" onClick={() => { setModo('actualizar'); setFormData({ nit: '', nombre: '', direccion: ''}); setMensaje(''); }}
                    className={`px-4 py-2 rounded-md font-semibold ${modo === 'actualizar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    Actualizar
                </button>

                <button type="button" onClick={() => { setModo('eliminar'); setFormData({ nit: '', nombre: '', direccion:''}); setMensaje(''); }}
                    className={`px-4 py-2 rounded-md font-semibold ${modo === 'eliminar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    Eliminar
                </button>

            </div>

            {/* Campos del formulario */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 justify-items-normal border-spacing-y-2">
                {/* NIT */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">NIT:</label>
                    <input type="text" name="nit" value={formData.nit} onChange={handleChange}
                        disabled={camposDeshabilitados.nit}
                        readOnly={camposDeshabilitados.nit}
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

                {/* Dirección */}
                <div>
                    <label className="block text-sm font-medium text-gray-900">Dirección:</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange}
                        disabled={camposDeshabilitados.direccion}
                        readOnly={camposDeshabilitados.direccion}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>
            </div>

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