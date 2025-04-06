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