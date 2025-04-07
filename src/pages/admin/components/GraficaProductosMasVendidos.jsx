import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function GraficaProductosMasVendidos ({ data }){
  return (
    <div className="flex flex-col items-center w-full h-[400px] p-15 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Productos más vendidos</h2>
      <ResponsiveContainer width="70%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="compras" fill="#8884d8" name="Cantidad Vendida" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};