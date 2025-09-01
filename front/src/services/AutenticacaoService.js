import BaseService from "./BaseService";

class AutenticacaoService extends BaseService{
    constructor(){
        super("/autenticacao");
    }

    async login(dados){
        const resposta = await this.api.post(`${this.endPoint}/login`, dados);
        return resposta;
    }
}

export default AutenticacaoService;