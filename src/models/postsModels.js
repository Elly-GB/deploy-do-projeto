import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão como variável de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do Banco de Dados.
export async function getTodosPosts(){
    // Seleciona o Banco específico:
    const db = conexao.db("imersão-instabytes");

    // Seleciona a Coleção específica dentro do Banco:
    const colecao = db.collection("posts");
    
    // Retorna um array com todos os documentos da Coleção.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersão-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersão-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}