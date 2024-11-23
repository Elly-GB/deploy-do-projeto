import {getTodosPosts , criarPost, atualizarPost} from "../models/postsModels.js";

// Função da biblioteca utilizada.
import fs from "fs";

import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts (req, res)
{
    // Chama a função para buscar os posts.
    const posts =  await getTodosPosts();

    // Envia uma resposta em HTTP (numeros) com status 200 (OK). Envia os posts em JSON.
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    // Requisição junto do corpo (conteúdo).
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost)
        res.status(200).json(postCriado);

        // Caso não conseguir "tentar", fazer isso:
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
    
}

export async function uploadImagem(req, res) {
    // Requisição junto do corpo (conteúdo).
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
        // Caso não conseguir "tentar", fazer isso:
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    } 
}

export async function atualizarNovoPost(req, res) {
    // 
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

    // Representa os dados.
    const post = {
        imgUrl: urlImagem,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try {
        //gemini
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        // Representa os dados e descrição da Imagem.
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);

        // Caso não conseguir "tentar", fazer isso:
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
    
}