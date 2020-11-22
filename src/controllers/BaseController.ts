import express,{ Router } from "express";
import { BaseRepository } from "../repositories/BaseRepository";

export abstract class BaseController<T>{

    /**
     * Retorna o path base para esse router
     */
    abstract getPath(): string

    /**
     * Retorna o router do controller
     */
    router: express.Router = express.Router();

    abstract repository: BaseRepository<T>

    constructor(){
        this.initializeRoutes(this.router)
    }

    initializeRoutes(router: Router): void {
       router.get("/",this.getAll)
       router.post("/create",this.create)
       router.get("/delete",this.delete)
       router.post("/update",this.update)
       router.get("/get/",this.get)
    }

    /**
     * Inicializa as rotas do controller
     */
    abstract newRoutes(router: Router): void

    protected getAll = (_: express.Request, response: express.Response) => {
        response.send(this.repository.getAll());
    }

    protected create = (request: express.Request, response: express.Response) => {
        const object: T = request.body as T;
        if(object){
            response.send(this.repository.add(object));
        }else{
            response.send({code: 402,message:"Erro no objeto enviado"})
        }
       
    }

    protected delete = (request: express.Request, response: express.Response) =>{
        const id: string = request.query.id as string;
        response.send(this.repository.delete(id))
    }

    protected update = (request: express.Request, response: express.Response) =>{
        const object: T = request.body;
        if(object){
            response.send(this.repository.update(object))
        }else{
            response.send({code: 402,message:"Erro no objeto enviado"})
        }
    }

    protected get = (request: express.Request, response: express.Response) =>{
        const id: string = request.query.id as string;
        response.send(this.repository.get(id))
    }
}