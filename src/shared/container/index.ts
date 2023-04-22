import { container } from "tsyringe";

import { IPlataformasRepository } from "@repositories/Plataformas/IPlataformasRepository";
import { PlataformasRepository } from "@repositories/Plataformas/PlataformasRepository";
import { IMarcasRepository } from "@repositories/Marcas/IMarcasRepository";
import { MarcasRepository } from "@repositories/Marcas/MarcasRepository";


container.registerSingleton<IPlataformasRepository>(
    "PlataformasRepository",
    PlataformasRepository
)

container.registerSingleton<IMarcasRepository>(
    "MarcasRepository",
    MarcasRepository
)