import { Plataforma } from "models/Plataforma";
import { ICreatePlataformaDTO } from "./ICreatePlataformaDTO";


export interface IPlataformasRepository {
    create({ id_marca, nome_plataforma }: ICreatePlataformaDTO): Promise<Plataforma>;
    findByName(nome_plataforma: string): Promise<Plataforma>;
    findById(id: string): Promise<Plataforma>;
    list(): Promise<Plataforma[]>;
}