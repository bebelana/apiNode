import { Automovel } from "../models/automovel";
import { BaseRepository } from "./BaseRepository";
import  BaseResponse from "../models/baseResponse";

export default class AutomovelRepository extends BaseRepository<Automovel>{

    private mockedAutho: Automovel[] =[]

    getAll(): Automovel[]{
        return this.mockedAutho
    }

    add(object: Automovel): BaseResponse{
        try {
            object.id = this.checkUUID(object.id)
            this.mockedAutho.push(object)
            return {code:200}
        } catch (error) {
            return {code:400,message:error.message}
        }
    }

    delete(id: string): BaseResponse{
        const index = this.mockedAutho.findIndex(x => x.id === id)
        if(index>-1){
            this.mockedAutho.splice(index,1)
            return {code: 200}
        }else{
            return {code: 403,message:"Erro ao deletar automóvel"}
        }
    }
    
    update(object: Automovel): BaseResponse{
        const index = this.mockedAutho.findIndex(x => x.id === object.id)
        if(index>-1){
            this.mockedAutho[index] = object
            return {code: 200}
        }else{
            return {code: 403,message:"Erro ao atualizar automóvel"}
        }
    }
    
    get(id: string): Automovel | undefined{
        const index = this.mockedAutho.findIndex(x => x.id === id)
        if(index>-1){
            return this.mockedAutho[index]
        }else{
            return undefined
        }
    }
}