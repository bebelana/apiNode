import { BaseRepository } from "./BaseRepository";
import { Utilizacao } from "../models/utilizacao";
import  BaseResponse from "../models/baseResponse";
import AutomovelRepository from "./AutomovelRepository";
import MotoristaRepository from "./MotoristaRepository";
import { Motorista } from "../models/motorista";


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
    
    isUsingCar(idMoto:string): Boolean{
        const usingCar = this.mockedUtilizacao.filter(x => x.motorista.id === idMoto && x.dataFim === undefined)
        return usingCar.length > 0
    }

    finishUsing(moto:Motorista): BaseResponse {
        if(moto.id){
            if(this.isUsingCar(moto.id)){
                const index = this.getIndexLastUsage(moto.id)
                this.mockedUtilizacao[index].dataFim = Date.now()
                return {code: 200}
            }else{
                return {code: 403,message:"Erro ao atualizar utilizacao"}
            }    
        }else{
            return {code: 403,message:"Erro ao atualizar utilizacao"}
        }
    }

    private getIndexLastUsage(idMoto: string): number{
        const index = this.mockedUtilizacao.findIndex(x => x.motorista.id === idMoto && x.dataFim === undefined)
        return index
    }

}
