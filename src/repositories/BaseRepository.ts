import BaseResponse from "../models/baseResponse";
import validate from "uuid-validate";
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseRepository<T>{

    abstract getAll(): T[]
    abstract add(object: T): BaseResponse
    abstract delete(id: string): BaseResponse
    abstract update(object: T): BaseResponse
    abstract get(id: string): T | undefined

    checkUUID = (id?: string): string =>{
        if(id && validate(id,4)){
            return id
        }else{
            return uuidv4()
        }
    }
}