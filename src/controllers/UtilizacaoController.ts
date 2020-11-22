import { BaseController } from "./BaseController";
import { Utilizacao } from "../models/utilizacao";
import UtilizacaoRepository from "../repositories/UtilizacaoRepository";
import { BaseRepository } from '../repositories/BaseRepository';
import express, {Request, Response, Router} from 'express';


export default class UtilizacaoController extends BaseController<Utilizacao>{

    repository: BaseRepository<Utilizacao>
    
    constructor(utilizacaoRepository: UtilizacaoRepository){
        super()
        this.repository = utilizacaoRepository
    }

    getPath(): string {
        return "/utilizacao"
    }    
    
    newRoutes(router: Router): void {
    }

}