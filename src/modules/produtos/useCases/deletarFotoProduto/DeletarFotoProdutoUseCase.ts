import { IProdutosImagesRepository } from "@repositories/ProdutosImages/IProdutosImagesRepository";
import { inject, injectable } from "tsyringe";
import fs from "fs";
import { resolve } from "path";

interface IRequest {
    arquivos: string[];
}

@injectable()
export class DeletarFotoProdutoUseCase {

    constructor(
        @inject("ProdutosImagesRepository")
        private produtosImagensRepository: IProdutosImagesRepository
    ) { }

    async execute({ arquivos }: IRequest) {

        arquivos.map(async (id) => {
            const imagem = await this.produtosImagensRepository.findImageById(id);
            console.log(imagem);

            if (imagem) {
                await this.produtosImagensRepository.del(id);
                const path = resolve(__dirname, "..", "..", "..", "..", "..", "imagens", "produtos", `${imagem.nome_imagem}`)
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    //file removed
                })
            }
        })
    }
}
