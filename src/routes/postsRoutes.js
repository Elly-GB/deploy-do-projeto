import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000", 
    // Status code de OK
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

// Define rotas usando o Express app.
const routes = (app) => {
    // Permite que o servidor interprete requisições com JSON.
    app.use(express.json());
    
    //
    app.use(cors(corsOptions));

    // Rota para buscar os posts.
    app.get("/posts", listarPosts);
    
    // Rota para criar um post.
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagens (uma por vez, chamada "imagem").
    app.post("/upload", upload.single("imagem"), uploadImagem)

    // Rota para atualizar algo que já existe.
    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;