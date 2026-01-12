import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

export default function manipuladorErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) { // Aqui é erro de conversão de tipo, exemplo id inválido
        new RequisicaoIncorreta().enviarResposta(res);

    } else if (erro instanceof mongoose.Error.ValidationError) { // Aqui é erro de validação de dados, exemplo campo obrigatório não preenchido
        new ErroValidacao(erro).enviarResposta(res);

    } else if(erro instanceof NaoEncontrado) { // Aqui é erro de rota não encontrada/inexistente
        erro.enviarResposta(res);
        
    } else { // Erro genérico, exemplo erro de servidor
        new ErroBase().enviarResposta(res);
    }
}