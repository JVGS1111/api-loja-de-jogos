export interface ICreateUsuarioDTO {
    nome: string;
    senha: string;
    email: string;
    admin?: boolean;
}