import React, { useState } from 'react';

export function FormProduct() {
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        precio_unitario: '',
        nit: '',
        nom_proveedor: '',
        proveedorValido: false,
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

        if (name === 'nit' && value.length >= 6) {
            buscarNombreProveedor(value);
        }
    };

    const proveedoresMock = {
        '123456789': 'PROVEEDOR TECH S.A.S',
        '987654321': 'INVERSIONES DIGITALES',
        '456123789': 'PLASTICOL LTDA',
    };

    const buscarNombreProveedor = (nit) => {
        const nombre = proveedoresMock[nit];
        if (nombre) {
            setFormData(prev => ({ 
                ...prev, 
                nom_proveedor: nombre, 
                proveedorValido: true 
            }));
            setMensaje('');
        } else {
            setFormData(prev => ({ 
                ...prev, 
                nom_proveedor: '', 
                proveedorValido: false 
            }));
            setMensaje('Proveedor no encontrado.');
        }
    };

    const fetchDataByCodigo = (codigo, nit) => {
        console.log(`Buscando datos de código: ${codigo}`);
        const mockData = {
            codigo: codigo,
            nombre: 'CELULAR_NUEVO',
            precio_unitario: '500000',
            nit: '123456789',
            nom_proveedor: '',
        };
        const nombre = proveedoresMock[mockData.nit];
        setFormData({
            ...mockData,
            nom_proveedor: nombre || '',
            proveedorValido: !!nombre
        });

        if (modo === 'eliminar') {
            setMensaje("Datos cargados para eliminar.");
        } else if (modo === 'actualizar') {
            setMensaje("Datos cargados para actualizar.");
        }
    };

    const handleBuscar = () => {
        if (!formData.codigo) {
            setMensaje("Debe ingresar el código para buscar.");
            return;
        }
        if (!codigoValido) {
            setMensaje("El código debe tener exactamente 4 caracteres alfanuméricos.");
            return;
        }
        fetchDataByCodigo(formData.codigo, formData.nit);
    };

    const handleSubmit = (e) => {
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
            const camposObligatorios = ['codigo', 'nombre', 'precio_unitario', 'nit'];
            const camposVacios = camposObligatorios.filter(campo => formData[campo] === '');

            if (camposVacios.length > 0) {
                setMensaje("Por favor, complete todos los campos obligatorios.");
                return;
            } else if (!formData.proveedorValido) {
                setMensaje("El proveedor del producto no es válido.");
                return;
            } else {
                setMensaje("Producto agregado correctamente ✅");
            }
        } else if (modo === 'actualizar') {
            setMensaje("Datos actualizados correctamente ✅");
        } else if (modo === 'eliminar') {
            setMensaje("Producto eliminado correctamente ❌");
            setFormData({
                codigo: '',
                nombre: '',
                precio_unitario: '',
                nit: '',
                nom_proveedor: '',
                proveedorValido: false
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
                                proveedorValido: false
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
                    <input type="text" name="nit" value={formData.nit} onChange={handleChange}
                        disabled={camposDeshabilitados.nit}
                        readOnly={camposDeshabilitados.nit}
                        className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900">Nombre Proveedor:</label>
                    <input type="text" name="nom_proveedor" value={formData.nom_proveedor}
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