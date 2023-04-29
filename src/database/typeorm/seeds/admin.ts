import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuid();
    const password = await hash("123456", 8);

    await connection.query(
        `INSERT INTO USUARIOS(id, nome, email, senha, admin, created_at)
        values(
            '${id}', 'admin', 'admin@lojajogos.com.br', '${password}', true, 'now()'
        )`
    );

    await connection.destroy();
}

create()
    .then(() => { console.log("Administrador criado"); })
    .catch((err) => {
        console.log(`Erro ao criar adm: ${err}`);
    })