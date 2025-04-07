import React, { useState } from 'react';
import { GraficaProductosMasVendidos } from './GraficaProductosMasVendidos';
import { TableComponent } from '../../../components/TableComponent';
import { useEffect} from 'react';
import { columns_pedidos_cant } from '../hook/Tables';
import { columns_clientes } from '../hook/Tables';
import { columns_productos_comprados } from '../hook/Tables';
import { columns_prod_prov } from '../hook/Tables';

export const Inicio = () => {
    const [vistaActiva, setVistaActiva] = useState("productos"); // 'productos', 'clientesSinPedidos', 'cantidadPorCliente', 'pedidosPorCliente'

    const [data, setData] = useState([])
    const [data_grap, setDataGrap] = useState([])

    const botones = [
        { id: "productos", label: "Proveedores y productos" },
        { id: "clientesSinPedidos", label: "Clientes sin pedidos" },
        { id: "cantidadPorCliente", label: "Cantidad de pedidos" },
        { id: "pedidosPorCliente", label: "Pedidos por cliente" },
    ];

    // const productosVendidos = [
    //     { nombre: 'Teclado', compras: 25 },
    //     { nombre: 'Mouse', compras: 18 },
    //     { nombre: 'Monitor', compras: 12 },
    //     { nombre: 'Cable HDMI', compras: 10 },
    //   ];

    // Asignación de endpoint según la vista
    const endpointMap = {
        productos: 'op4',
        clientesSinPedidos: 'op2',
        cantidadPorCliente: 'op1',
        pedidosPorCliente: 'op3',
    };

    const getDataGrap = async () => {
        try {
            console.log('Fetching data for graph...');
            const response = await fetch(`http://localhost:3000/op12`);
            const json = await response.json();
            setDataGrap(json);
            console.log('datos_grafica:', json); // Cambiado de 'data' a 'json'
        } catch (error) {
            console.error('Error al obtener los datos de la grafica:', error);
        }
    }
    
    useEffect(() => {
        getDataGrap();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = endpointMap[vistaActiva];
            if (!endpoint) return;

            try {
                const response = await fetch(`http://localhost:3000/${endpoint}`);
                const json = await response.json();
                // Formatear fecha si es necesario
                if (vistaActiva === 'clientesSinPedidos') {
                    json.forEach((element) => {
                        const date = new Date(element.fecha_nacimiento);
                        element.fecha_nacimiento = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    });
                }
                setData(json);
                console.log('Clientes:', data)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [vistaActiva]);

    return (
        <div className="flex flex-col w-[90%] h-[90%] min-h-[400px] bg-gradient-to-t from-[#f0f0f0] to-[#FFF] rounded-lg overflow-y-auto shadow-lg px-[100px] py-[50px]">
            
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administrador</h1>

            <div className="w-full">
                <GraficaProductosMasVendidos data={data_grap} />
            </div>

            <div className="flex gap-4 mb-8 mt-[70px]">
                {botones.map(boton => (
                    <button
                        key={boton.id}
                        onClick={() => setVistaActiva(boton.id)}
                        className={`px-4 py-2 rounded-lg shadow transition-all duration-200 font-semibold ${
                            vistaActiva === boton.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                        }`}
                    >
                        {boton.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-center w-full h-[500px] rounded-2xl shadow-lg p-4 bg-white">
                <TableComponent     columna={
                    vistaActiva === 'productos' 
                        ? columns_prod_prov
                        : vistaActiva === 'clientesSinPedidos' 
                        ? columns_clientes
                        : vistaActiva === 'cantidadPorCliente' 
                        ? columns_pedidos_cant
                        : vistaActiva === 'pedidosPorCliente' 
                        ? columns_productos_comprados
                        : []
                    }  data={data} texto={vistaActiva === 'productos' 
                        ? 'Proveedores y productos'
                        : vistaActiva === 'clientesSinPedidos' 
                        ? 'Clientes sin pedidos'
                        : vistaActiva === 'cantidadPorCliente' 
                        ? 'Cantidad de pedidos'
                        : vistaActiva === 'pedidosPorCliente' 
                        ? 'Pedidos por cliente'
                        : []} />

            </div>

        </div>
    );
};