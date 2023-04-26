import { container } from "tsyringe";

import { IPlataformasRepository } from "@repositories/Plataformas/IPlataformasRepository";
import { PlataformasRepository } from "@repositories/Plataformas/PlataformasRepository";
import { IMarcasRepository } from "@repositories/Marcas/IMarcasRepository";
import { MarcasRepository } from "@repositories/Marcas/MarcasRepository";
import { IProdutosRepository } from "@repositories/Produtos/IProdutosRepository";
import { ProdutosRepository } from "@repositories/Produtos/ProdutosRepository";
import { IUsuariosRepository } from "@repositories/Usuarios/IUsuariosRepository";
import { UsuariosRepository } from "@repositories/Usuarios/UsuariosRepository";


container.registerSingleton<IPlataformasRepository>(
    "PlataformasRepository",
    PlataformasRepository
)

container.registerSingleton<IMarcasRepository>(
    "MarcasRepository",
    MarcasRepository
)

container.registerSingleton<IProdutosRepository>(
    "ProdutosRepository",
    ProdutosRepository
)

container.registerSingleton<IUsuariosRepository>(
    "UsuariosRepository",
    UsuariosRepository
)