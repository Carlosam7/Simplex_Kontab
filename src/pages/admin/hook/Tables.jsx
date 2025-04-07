export const columns_productos = [
    {
        header: "Código",
        accessorKey: 'codigo',
        enableColumnFilter: true,
    },
    {
        header: "Nombre producto",
        accessorKey: 'nombre',
    },
    {
        header: "Precio unitario",
        accessorKey: 'precio_unitario',
    },
    {
        header: "Nit proveedor",
        accessorKey: 'nit_proveedor',
    },
];

export const columns_clientes = [
    {
        header: "ID",
        accessorKey: 'id_cliente',
    },
    {
        header: "Nombre",
        accessorKey: 'nombre',
    },
    {
        header: "Apellido",
        accessorKey: 'apellidos',
    },
    {
        header: "Fecha de nacimiento",
        accessorKey: 'fecha_nacimiento',
    },
    {
        header: "Direccion",
        accessorKey: 'direccion',
    },
];

export const columns_proveedores = [
    {
        header: "Nit",
        accessorKey: 'nit',
    },
    {
        header: "Nombre",
        accessorKey: 'nombre',
    },
    {
        header: "Dirección",
        accessorKey: 'direccion',
    },
];

export const columns_pedidos = [
    {
        header: "ID",
        accessorKey: 'id',
    },
    {
        header: "Name",
        accessorKey: 'name',
    },
    {
        header: "lastName",
        accessorKey: 'LastName',
    },
    {
        header: "Email",
        accessorKey: 'email',
    },
    {
        header: "Gender",
        accessorKey: 'gender',
    },
    {
        header: "BirthDate",
        accessorKey: 'DateOfBird',
    }
]

export const columns_pedidos_cant = [
    {
      header: "ID Cliente",
      accessorKey: 'id_cliente',
    },
    {
      header: "Nombre del Cliente",
      accessorKey: 'nombre_cliente',
    },
    {
      header: "Pedidos Realizados",
      accessorKey: 'pedidos_realizados',
    }
  ]

  export const columns_productos_comprados = [
    {
      header: "Cliente",
      accessorKey: "nombre_cliente",
    },
    {
      header: "Producto",
      accessorKey: "nombre_producto",
    },
    {
      header: "Cantidad Comprada",
      accessorKey: "cantidad",
    },
    {
      header: "Precio de Compra",
      accessorKey: "precio_compra",
    },
    {
      header: "Proveedor",
      accessorKey: "nombre_proveedor",
    }
  ];

  export const columns_prod_prov = [
    {
        header: "Codigo Producto",
        accessorKey: "codigo_producto",
    },

    {
    header: "Nombre Producto",
    accessorKey: "nombre_producto",
    },
    {
      header: "Nit Proveedor",
      accessorKey: "nit_proveedor",
    },
    {
      header: "Nombre Proveedor",
      accessorKey: "nombre_proveedor",
    }

  ];