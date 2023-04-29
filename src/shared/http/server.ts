import createConnection from "database";
import { app } from "./app";


createConnection();

app.listen(3000, () => {
    console.log("Server rodando");

})