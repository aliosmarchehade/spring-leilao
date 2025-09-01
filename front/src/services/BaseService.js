import api from "../configs/axiosConfig";

class BaseService{

    constructor(endPoint){
            this.endPoint = endPoint;
            this.api = api;
    }

    async inserir(dados){
        const resposta = await this.api.post(this.endPoint, dados);
        return resposta;
    }

    async alterar(dados){
        const resposta = await this.api.put(this.endPoint, dados);
        return resposta;
    }

    async excluir(id){
        const resposta = await this.api.delete(`${this.endpoint}/${id}`);
        return resposta;
    }

    async buscarTodos(){
        const resposta = await this.api.get(this.endPoint);
        return resposta;
    }
}
export default BaseService;