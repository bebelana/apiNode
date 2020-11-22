import express, {Request, Response, Router} from 'express';
import { BaseController } from "./BaseController";
import MotoristaRepository from '../repositories/MotoristaRepository';
import { Motorista } from '../models/motorista';
import { BaseRepository } from '../repositories/BaseRepository';


export default class MotoristaController extends BaseController<Motorista>{
    
    repository: BaseRepository<Motorista> = new MotoristaRepository()

    constructor(motoRepository: MotoristaRepository){
        super()
        this.repository = motoRepository
    }

    getPath(): string {
        return "/motoristas"
    }
    
   
    newRoutes(router: Router): void {
    }
}