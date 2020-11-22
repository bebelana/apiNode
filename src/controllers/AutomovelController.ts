import express, {Request, Response, Router} from 'express';
import { BaseController } from './BaseController';
import { Automovel } from '../models/automovel';
import AutomovelRepository from '../repositories/AutomovelRepository';
import { BaseRepository } from '../repositories/BaseRepository';

export default class AutomovelController extends BaseController<Automovel>{
        
    repository: BaseRepository<Automovel> = new AutomovelRepository()

    constructor(autoRepository: AutomovelRepository){
        super()
        this.repository = autoRepository
    }

    public getPath = () : string => {
        return "/automoveis"
    }

    newRoutes(router: Router): void {
    }
}