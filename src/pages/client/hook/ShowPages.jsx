import { Inicio } from "../components/Inicio";
import { MiPerfil } from "../components/MiPerfil";
import { columns_productos } from "./Tables";


export function ShowPages(page) {
    switch (page) {
        case "Inicio":
            return <Inicio/>;
        case "Mi perfil":
            return <MiPerfil columns_productos={ columns_productos } />;
        case "Ayuda":
            return <h1>Ayuda</h1>;
        default:
            return <Inicio />;
    }
}