import { app } from "./app";
import { createConnection } from "database";

createConnection();

app.listen(3000, () => {
    console.log("Server rodando");

})