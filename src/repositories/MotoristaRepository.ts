import { BaseRepository } from "./BaseRepository";
import { Motorista } from "../models/motorista";
import  BaseResponse from "../models/baseResponse";

export default class MotoristaRepository extends BaseRepository<Motorista>{
    
    private mockedMotorista: Motorista[] =[]
    
    getAll(): Motorista[] {
        return this.mockedMotorista
    }

    add(object: Motorista): BaseResponse {
        try {
            this.mockedMotorista.push(object)
            return {code:200}
        } catch (error) {
            return {code:400,message:error.message}
        }
    }

    delete(id: string): BaseResponse {
        const index = this.mockedMotorista.findIndex(x => x.id === id)
        if(index>-1){
            this.mockedMotorista.splice(index,1)
            return {code: 200}
        }else{
            return {code: 403,message:"Erro ao deletar motorista"}
        }
    }

    update(object: Motorista): BaseResponse {
       const index = this.mockedMotorista.findIndex(x => x.id === object.id)
        if(index>-1){
            this.mockedMotorista[index] = object
            return {code: 200}
        }else{
            return {code: 403,message:"Erro ao atualizar motorista"}
        }
    }

    get(id: string): Motorista | undefined {
        const index = this.mockedMotorista.findIndex(x => x.id === id)
        console.log(`index para encontrar ${index}`)
        if(index>-1){
            return this.mockedMotorista[index]
        }else{
            return undefined
        }
    }

}