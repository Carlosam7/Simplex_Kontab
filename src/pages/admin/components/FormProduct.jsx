import React, { useState } from 'react';

export function FormProduct() {
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        precio_unitario: '',
        nit_proveedor: '',
        nom_proveedor: ''
    });

    const [dataProveedor, setDataProveedor] = useState({
        nit: '',
        nombre: '',
        direccion: ''
    });

    const [modo, setModo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const codigoValido = /^[A-Za-z0-9]{4}$/.test(formData.codigo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setDataProveedor({dataProveedor,});

        if (name === 'nit' && (value.length == 10)) {
            buscarNombreProveedor(value);
        }
    };

    const handleBuscar = async () => {
        if (formData.codigo === '') {
            setMensaje('Debe ingresar el código del producto.');
            alert('Debe ingresar el código del producto.');
            return;
        } else {
            try {
                console.log(`Buscando producto con código: ${formData.codigo}`);
                const response = await fetch('http://localhost:3000/searchOnDB', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ table: 'producto', PK: 'codigo', PKValue: formData.codigo })
                });
    
                const data = await response.json();
                console.log('precio', data[0].precio_unitario)
                console.log('Suma', data[0].precio_unitario + 8)
    
                if (data.length > 0) {
                    const proveedorData = await buscarNombreProveedor(data[0].nit_proveedor);
                    
                    // Actualizamos el estado de los datos del producto y el proveedor
                    setFormData({
                        codigo: data[0].codigo,
                        nombre: data[0].nombre,
                        precio_unitario: data[0].precio_unitario,
                        nit_proveedor: data[0].nit_proveedor,
                        nom_proveedor: proveedorData.nombre // Asegúrate de que `proveedorData` tenga la estructura correcta
                    });
    
                    setMensaje('');
                } else {
                    setFormData({
                        nombre: '',
                        precio_unitario: '',
                        nit_proveedor: '',
                        nom_proveedor: ''
                    });
                    setMensaje('El producto no se encontró en la base de datos.');
                    alert('El producto no se encontró en la base de datos.');
                }
            } catch (error) {
                console.error('Error al buscar el producto:', error);
                setMensaje('Error al buscar el producto. Intente de nuevo.');
                alert('Error al buscar el producto. Intente de nuevo.');
            }
        }
    };
    
    const buscarNombreProveedor = async (nit) => {
        if (nit === '') {
            setMensaje('Debe ingresar un NIT del proveedor.');
            alert('Debe ingresar un NIT del proveedor.');
            return;
        }
    
        try {
            console.log(`Buscando proveedor con NIT: ${nit}`);
            const response = await fetch('http://localhost:3000/searchOnDB', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ table: 'proveedor', PK: 'nit', PKValue: nit })
            });
    
            const data = await response.json();
    
            if (data.length > 0) {
                setDataProveedor(data[0]);
                return data[0]; // Asegúrate de que esto devuelve la estructura correcta
            } else {
                setDataProveedor({
                    nit: '',
                    nombre: '',
                    direccion: ''
                });
                setMensaje('El proveedor no se encontró en la base de datos.');
                alert('El proveedor no se encontró en la base de datos.');
                return {}; // Retorna un objeto vacío si no se encuentra el proveedor
            }
        } catch (error) {
            console.error('Error al buscar el proveedor:', error);
            setMensaje('Error al buscar el proveedor. Intente de nuevo.');
            alert('Error al buscar el proveedor. Intente de nuevo.');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.codigo) {
            setMensaje("Debe ingresar el código.");
            return;
        }

        if (!codigoValido) {
            setMensaje("El código debe tener exactamente 4 caracteres alfanuméricos.");
            return;
        }

        if (modo === 'agregar') {
            if(dataProveedor.nit === ''){
                setMensaje("El NIT del proveedor no es válido.");
                alert(mensaje)
                return;
            }else{
                const infoProducto = {
                    codigo: formData.codigo,
                    nombre: formData.nombre,
                    precio_unitario: formData.precio_unitario,
                    nit_proveedor: dataProveedor.nit,
                }
                try{
                    const response = fetch('http://localhost:3000/insert', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({table: 'producto', data: infoProducto}) 
                        })
                    if (response.ok) {
                        setMensaje("Producto agregado correctamente ✅");
                    }
                    else {
                        setMensaje("Error al agregar el producto. Intente de nuevo.");
                    }


                }catch (error) {
                    console.error('Error al agregar el producto:', error);
                    setMensaje("Error al agregar el producto. Intente de nuevo.");
                    alert(mensaje)
                }
            }
            setFormData({
                codigo: '',
                nombre: '',
                precio_unitario: '',
                nit_proveedor: '',
                nom_proveedor: '',
            });
        } else if (modo === 'actualizar') {
            console.log(formData)
            if (formData.codigo === '') {
                setMensaje("No se encontró el producto con el codigo proporcionado.");
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
                        
                        body: JSON.stringify({ table: 'producto', column: Object.keys(formData)[i], newColumnValue: formData[Object.keys(formData)[i]] , primaryKey: 'codigo', PKValue: formData.codigo })
                    })
                    }
              
                }catch (error) {
                    alert('Error al insertar. Verifique que no exista un dato con esta llave primaria')
                    console.error('🔴 Error al insertar:', error)
                    message.error('Error al insertar. Verifique que no exista un dato con esta llave primaria')
                }
            }

            setFormData({
                codigo: '',
                nombre: '',
                precio_unitario: '',
                nit_proveedor: '',
                nom_proveedor: '',
            });
            
        } else if (modo === 'eliminar') {
            setMensaje("Producto eliminado correctamente ❌");
            if (formData.nit === '') {
                setMensaje("No se encontró el producto con el codigo proporcionado.");
                alert(mensaje);
                return;
            }else{
                try{
                    const response = await fetch('http://localhost:3000/deleteFromTable', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ table: 'producto', PK: 'codigo', PKValue: formData.codigo })
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
                codigo: '',
                nombre: '',
                precio_unitario: '',
                nit_proveedor: '',
                nom_proveedor: 'No proveedor',
            });
        }
        console.log("Acción:", modo, "Datos:", formData);
    };

    const camposDeshabilitados = {
        codigo: modo === '',
        nombre: !(modo === 'agregar' || modo === 'actualizar'),
        precio_unitario: !(modo === 'agregar' || modo === 'actualizar'),
        nit: !(modo === 'agregar' || modo === 'actualizar'),
        nom_proveedor: true
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col pb-5 w-full">
            {/* Botones de Modo */}
            <div className="flex gap-4 mb-5">
                {['agregar', 'actualizar', 'eliminar'].map((item) => (
                    <button key={item} type="button"
                        onClick={() => {
                            setModo(item);
                            setFormData({
                                codigo: '',
                                nombre: '',
                                precio_unitario: '',
                                nit: '',
                                nom_proveedor: '',
                            });
                            setMensaje('');
                        }}
                        className={`px-4 py-2 rounded-md font-semibold ${modo === item ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                ))}
            </div>

            {/* Campos del formulario */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-900">Código:</label>
                    <input type="text" name="codigo" value={formData.codigo} onChange={handleChange}
                        disabled={camposDeshabilitados.codigo}
                        readOnly={camposDeshabilitados.codigo}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900">Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                        disabled={camposDeshabilitados.nombre}
                        readOnly={camposDeshabilitados.nombre}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900">Precio Unitario:</label>
                    <input type="text" name="precio_unitario" value={formData.precio_unitario} onChange={handleChange}
                        disabled={camposDeshabilitados.precio_unitario}
                        readOnly={camposDeshabilitados.precio_unitario}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900">NIT Proveedor:</label>
                    <input type="text" name="nit" value={(modo==='agregar' || modo==='eliminar')?formData.nit_proveedor:dataProveedor.nit} onChange={handleChange}
                        disabled={camposDeshabilitados.nit}
                        readOnly={camposDeshabilitados.nit}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900">Nombre Proveedor:</label>
                    <input type="text" name="nom_proveedor" value={dataProveedor.nombre}
                        readOnly
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 bg-gray-100" />
                </div>
            </div>

            {/* Botones */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
                {(modo === 'actualizar' || modo === 'eliminar') && (
                    <button type="button" onClick={handleBuscar}
                        className="rounded-md bg-indigo-600 text-white px-6 py-2 font-semibold hover:bg-indigo-500">
                        Buscar
                    </button>
                )}
                <button type="submit"
                    className="rounded-md bg-indigo-600 text-white px-6 py-2 font-semibold hover:bg-indigo-500">
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