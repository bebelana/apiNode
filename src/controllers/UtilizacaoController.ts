import { BaseController } from "./BaseController";
import { Utilizacao } from "../models/utilizacao";
import UtilizacaoRepository from "../repositories/UtilizacaoRepository";
import { BaseRepository } from '../repositories/BaseRepository';
import express, {Request, Response, Router} from 'express';


export default class UtilizacaoController extends BaseController<Utilizacao>{

    repository: UtilizacaoRepository
    
    constructor(utilizacaoRepository: UtilizacaoRepository){
        super()
        this.repository = utilizacaoRepository
    }

    getPath(): string {
        return "/utilizacao"
    }    
    
    newRoutes(router: Router): void {
        router.post("/start",this.startUsing)
        router.get("/finish",this.finishUsing)
    }

    private startUsing = (request: express.Request, response: express.Response) => {
        const message = request.body as string;
        const idAuto: string = request.query.idAuto as string
        const idMoto: string = request.query.idMoto as string
        if(idAuto && idMoto){
            response.send(this.repository.startUsingAuto(idMoto,idAuto,message));
        }else{
            response.send({code: 402,message:"Erro no objeto enviado"})
        }
    }

    protected finishUsing = (request: express.Request, response: express.Response) =>{
        const id: string = request.query.id as string;
        response.send(this.repository.finishUsingMoto(id))
    }

}