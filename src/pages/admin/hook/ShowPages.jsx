import { Clientes } from "../components/Clientes";
import { Inicio } from "../components/Inicio";
import { Productos } from "../components/Productos";
import { Proveedores } from "../components/Proveedores";

export function ShowPages({ page }) {
    switch (page) {
        case "Inicio":
            return <Inicio/>;
        case "Clientes":
            return <Clientes/>;
        case "Productos":
            return <Productos/>;
        case "Proveedores":
            return <Proveedores/>;
        case "Ayuda":
            return <h1>Ayuda</h1>;
        default:
            return <Inicio />;
    }
}