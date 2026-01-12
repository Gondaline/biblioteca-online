import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro) {
        const msgErro = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ");

        super(`Os seguintes erros foram encontrados ${msgErro}`, 400)
    }
};

export default ErroValidacao; 