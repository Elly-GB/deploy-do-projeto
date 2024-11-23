import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
// Servir arquivos estáticos.
app.use(express.static("uploads"))
routes(app);

// Inicia o servidor na porta 3000 (mais utilizada). E nos certifica no console seu funcionamento.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

