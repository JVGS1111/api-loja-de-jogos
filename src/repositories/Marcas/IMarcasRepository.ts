import { Marca } from "models/Marca"


export interface IMarcasRepository {
    create(nome_marca: string): Promise<Marca>;
    list(): Promise<Marca[]>;
    findById(id: string): Promise<Marca>;
    findByName(nome_marca: string): Promise<Marca>;
}