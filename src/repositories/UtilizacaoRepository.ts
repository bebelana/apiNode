import { BaseRepository } from "./BaseRepository";
import { Utilizacao } from "../models/utilizacao";
import  BaseResponse from "../models/baseResponse";
import AutomovelRepository from "./AutomovelRepository";
import MotoristaRepository from "./MotoristaRepository";


export default class UtilizacaoRepository extends BaseRepository<Utilizacao>{

    private mockedUtilizacao: Utilizacao[] =[]
    private _autoRepository: AutomovelRepository
    private _motoRepository: MotoristaRepository
    
    constructor(autoRepository: AutomovelRepository, motoristaRepository: MotoristaRepository){
        super()
        this._autoRepository = autoRepository
        this._motoRepository = motoristaRepository
    }

    getAll(): Utilizacao[]{
        return this.mockedUtilizacao
    }

    add(object: Utilizacao): BaseResponse{
        try {
            object.idUtilizacao = this.checkUUID(object.idUtilizacao)
            this.mockedUtilizacao.push(object)
            return {code:200}
        } catch (error) {
            return {code:400,message:error.message}
        }
    }

    delete(id: string): BaseResponse{
        const index = this.mockedUtilizacao.findIndex(x => x.idUtilizacao === id)
        if(index>-1){
            this.mockedUtilizacao.splice(index,1)
            return {code: 200}
        }else{
            return {code: 403,message:"Erro ao deletar utilizacao"}
        }
    }
    
    update(object: Utilizacao): BaseResponse{
        const index = this.mockedUtilizacao.findIndex(x => x.idUtilizacao === object.idUtilizacao)
        if(index>-1){
            this.mockedUtilizacao[index] = object
            return {code: 200}
        }else{
            return {code: 403,message:"Erro ao atualizar utilizacao"}
        }
    }
    
    get(id: string): Utilizacao | undefined{
        const index = this.mockedUtilizacao.findIndex(x => x.idUtilizacao === id)
        if(index>-1){
            return this.mockedUtilizacao[index]
        }else{
            return undefined
        }
    }

    checkMotoUsing(idMoto:string): number{
        const index = this.mockedUtilizacao.findIndex(x => x.motorista.id === idMoto && x.dataFim === undefined)
        return index
    }

    checkAutoUsed(idAuto: string): number{
        const index = this.mockedUtilizacao.findIndex(x=> x.auto.id === idAuto && x.dataFim === undefined)
        return index
    }

    startUsingAuto(idAuto: string, idMoto: string, motivo?: string): BaseResponse{
        const indexMoto = this.checkMotoUsing(idAuto)
        const indexAuto = this.checkAutoUsed(idMoto)

        if(indexMoto == -1 && indexAuto == -1){
            const utilizacao = this.createUtilizacao(idAuto,idMoto,motivo)
            if(utilizacao){
                this.add(utilizacao)
                return {code:200}
            }else{
                return {code:402, message: "Não é possível iniciar utilização"}
            }
        }else{
            return {code:402, message: "Não é possível iniciar utilização"}
        }
    }

    private createUtilizacao = (idAuto: string, idMoto: string, motivo?: string): Utilizacao | undefined =>{
        const auto = this._autoRepository.get(idAuto)
        const moto = this._motoRepository.get(idMoto)

        if(auto && moto){
            return {
                idUtilizacao: this.checkUUID(""),
                auto: auto,
                motorista: moto,
                dataInicio: Date.now(),
                dataFim: undefined,
                motivo: motivo
            }
        }else{
            return undefined
        }
    }

    finishUsingMoto(idMoto: string) :BaseResponse{
        const indexMoto = this.checkMotoUsing(idMoto)

        if(indexMoto>-1){
            this.mockedUtilizacao[indexMoto].dataFim=Date.now()
            return {code:200}
        }else{
            return {code:402, message: "Não é possível finalizar utilização"}
        }
    }

}