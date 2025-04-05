import { Clientes } from "../components/Clientes";
import { Inicio } from "../components/Inicio";
import { Productos } from "../components/Productos";
import { Proveedores } from "../components/Proveedores";
import { columns_clientes, columns_productos, columns_proveedores } from "./Tables";

export function ShowPages(page) {
    switch (page) {
        case "Inicio":
            return <Inicio/>;
        case "Clientes":
            return <Clientes columns_clientes={ columns_clientes } />;
        case "Productos":
            return <Productos columns_productos={ columns_productos }/>;
        case "Proveedores":
            return <Proveedores columns_proveedores={ columns_proveedores } />;
        case "Ayuda":
            return <h1>Ayuda</h1>;
        default:
            return <Inicio />;
    }
}