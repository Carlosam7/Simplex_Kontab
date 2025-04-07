import React, { useState } from 'react';
import { useEffect } from 'react';

export function FormPedido() {
    // Estado para almacenar el ID del cliente y la información del cliente
    const [clienteID, setClienteID] = useState('');
    const [clienteInfo, setClienteInfo] = useState({});
    const [clienteBloqueado, setClienteBloqueado] = useState(false);

    // Información del producto
    const [productoID, setProductoID] = useState('');
    const [productoInfo, setProductoInfo] = useState({ codigo: '', nombre: '', precio_unitario: 0 });
    const [cantidad, setCantidad] = useState(1);
    const [items, setItems] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (clienteID) buscarCliente(clienteID);
    }, [clienteID]);

    useEffect(() => {
        if (productoID) buscarProducto(productoID);
    }, [productoID]);

    const buscarCliente = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/searchOnDB', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ table: 'cliente', PK: 'id_cliente', PKValue: clienteID })
            })
      
            const data = await response.json()

            if (data.length > 0) {
                console.log(data)
                setClienteInfo(data[0]);
                setClienteID(data[0].id_cliente); // Actualizamos el ID del cliente
                setClienteBloqueado(true); // Bloqueamos el input
                setMensaje('');
            } else {
                setClienteInfo({ nombre: '', apellido: '' });
                setClienteBloqueado(false); // Lo dejamos editable
                setMensaje('Cliente no encontrado.');
            }
            console.log(data)
          } catch (error) {
            console.error('❌ Error a nivel de frontend:', error)
          }
        };

    const buscarProducto = async (codigo) => {

        try {
            const response = await fetch('http://localhost:3000/searchOnDB', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ table: 'producto', PK: 'codigo', PKValue: codigo })
            })
      
            const data = await response.json()

            if (data.length > 0) {
                console.log(data)
                setProductoInfo(data[0]);
                setMensaje('');
            } else {
                setProductoInfo({ codigo: '', nombre: '', precio_unitario: 0 });
                setMensaje('Producto no encontrado.');
            }
          } catch (error) {
            console.error('❌ Error a nivel de frontend:', error)
        }
    }

    const agregarItem = () => {
        if (!clienteInfo.nombre || !clienteInfo.apellidos) {
            setMensaje('Debe asociar el pedido con un cliente válido antes de agregar ítems.');
            return;
        }

        if (!productoInfo.codigo || cantidad <= 0) {
            setMensaje('Debe seleccionar un producto válido y una cantidad mayor que 0.');
            return;
        }

        const nuevoItem = {
            codigo: productoInfo.codigo,
            nombre: productoInfo.nombre,
            precio_unitario: productoInfo.precio_unitario,
            cantidad: cantidad,
            precio_total: productoInfo.precio_unitario * cantidad,
        };

        setItems([...items, nuevoItem]);
        setProductoID('');
        setProductoInfo({ codigo: '', nombre: '', precio_unitario: 0 });
        setCantidad(1);
        setMensaje('');
    };

    const finalizarPedido = async () => {
        const fechaActual = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
        const registros = items.map(item => ({
            fecha_compra: fechaActual,
            cantidad: item.cantidad,
            id_cliente: clienteID,
            codigo_producto: item.codigo,
            
        }));
        console.log(registros)
        try {
            let response
            for (let i = 0; i < registros.length; i++) {
                 response = await fetch('http://localhost:3000/insert', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ table: 'compra', data: registros[i] })
                })
            }
            const result = await response.json()
            if (response.status != 201){    
                throw new Error('No se insertaron datos en la tabla')
            }
            console.log('🟢 Insertado con éxito:', result)
            alert('¡Datos insertados con éxito, llave! 🎉')
        } catch (error) {
            alert('Error al insertar. Verifique que no exista un dato con esta llave primaria')
            console.error('🔴 Error al insertar:', error)
        } finally{
            setItems([]);
            setClienteID('');
            setClienteInfo({ nombre: '', apellido: '' });
            setClienteBloqueado(false); //Liberamos el campo
        }
        
    };

    const totalPedido = items.reduce((sum, item) => sum + item.precio_total, 0);

    return (
        <div className="p-6 bg-white shadow rounded-md w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Formulario de Pedido</h2>

            {/* Cliente */}
            <div className="mb-4">
                <label className="block text-sm font-medium">Número de Identificación:</label>
                <input
                    type="text"
                    value={clienteID}
                    onChange={(e) => {
                        setClienteID(e.target.value);
                        buscarCliente(e.target.value);
                    }}
                    disabled={clienteBloqueado} // bloqueamos cuando sea necesario
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <input
                        type="text"
                        value={clienteInfo.nombre}
                        readOnly
                        placeholder="Nombre"
                        className="bg-gray-100 w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        value={clienteInfo.apellidos}
                        readOnly
                        placeholder="Apellido"
                        className="bg-gray-100 w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
            </div>

            {/* Producto */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1">
                    <label className="block text-sm font-medium">Código Producto:</label>
                    <input
                        type="text"
                        value={productoID}
                        onChange={(e) => {
                            setProductoID(e.target.value);
                            buscarProducto(e.target.value);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium">Nombre Producto:</label>
                    <input
                        type="text"
                        value={productoInfo.nombre}
                        readOnly
                        className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium">Precio Unitario:</label>
                    <input
                        type="number"
                        value={productoInfo.precio_unitario}
                        readOnly
                        className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium">Cantidad:</label>
                    <input
                        type="number"
                        min={1}
                        value={cantidad}
                        onChange={(e) => setCantidad(parseInt(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
            </div>

            <button
                type="button"
                onClick={agregarItem}
                className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
                Agregar Ítem
            </button>

            {/* Tabla */}
            <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Código</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Cantidad</th>
                            <th className="px-4 py-2">Precio Unitario</th>
                            <th className="px-4 py-2">Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="px-4 py-2">{item.codigo}</td>
                                <td className="px-4 py-2">{item.nombre}</td>
                                <td className="px-4 py-2">{item.cantidad}</td>
                                <td className="px-4 py-2">${item.precio_unitario.toLocaleString()}</td>
                                <td className="px-4 py-2">${item.precio_total.toLocaleString()}</td>
                            </tr>
                        ))}
                        {items.length > 0 && (
                            <tr className="bg-gray-100 font-bold">
                                <td colSpan="4" className="px-4 py-2 text-right">Total Pedido:</td>
                                <td className="px-4 py-2">${totalPedido.toLocaleString()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Botón Finalizar */}
            <button
                type="button"
                onClick={finalizarPedido}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
                Finalizar Pedido
            </button>

            {mensaje && (
                <p className="mt-4 text-sm text-red-600 font-medium">{mensaje}</p>
            )}
        </div>
    );
}