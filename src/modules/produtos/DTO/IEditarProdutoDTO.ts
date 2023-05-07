export interface IEditarProdutoDTO {
    id: string,
    nome_produto: string,
    descricao_produto: string,
    id_plataforma: string,
    preco: number,
    quantidade: number,
    disponivel: boolean,
    id_marca?: string,
    promocao?: boolean,
    porcentagem_promocao?: number;
    valor_promocao?: number;
}