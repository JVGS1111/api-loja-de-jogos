import { DataSource } from "typeorm";
import { Plataformas1681992444797 } from "./migrations/1681992444797-plataformas";
import { Plataforma } from "../models/Plataforma";
import { Marcas1681995957738 } from "./migrations/1681995957738-marcas";
import { Marca } from "../models/Marca";
import { Produtos1682203921042 } from "./migrations/1682203921042-produtos";
import { Produto } from "../models/Produto";
import { Usuario } from "../models/Usuario";
import { Usuarios1682510886395 } from "./migrations/1682510886395-usuarios";
import { ImagensProdutos1682805160889 } from "./migrations/1682805160889-imagensProdutos";
import { ProdutoImagens } from "@models/ProdutoImagens";

const dataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username: "docker",
    password: "qwe123",
    database: "loja_jogos",
    entities: [
        Marca,
        Plataforma,
        Produto,
        Usuario,
        ProdutoImagens
    ],
    migrations: [
        Marcas1681995957738,
        Plataformas1681992444797,
        Produtos1682203921042,
        Usuarios1682510886395,
        ImagensProdutos1682805160889
    ],

})

export default function createConnection(host = "database_loja_jogos"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}

export { dataSource }
