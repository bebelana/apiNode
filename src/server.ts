import express, {Request, Response} from 'express';
import AutomovelController  from './controllers/AutomovelController';
import { BaseController } from './controllers/BaseController';
import MotoristaController from './controllers/MotoristaController';
import UtilizacaoController from './controllers/UtilizacaoController';
import MotoristaRepository from './repositories/MotoristaRepository';
import AutomovelRepository from './repositories/AutomovelRepository';
import UtilizacaoRepository from './repositories/UtilizacaoRepository';

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000;

const server = app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})

const motoRepository = new MotoristaRepository()
const autoRepository = new AutomovelRepository()
const utilizacaoRepository = new UtilizacaoRepository(autoRepository,motoRepository)

const controllers : BaseController<any>[] = [
    new AutomovelController(autoRepository),
    new MotoristaController(motoRepository), 
    new UtilizacaoController(utilizacaoRepository)
]

app.get('/',(req:Request,res:Response)=>{
    res.send("Server working now it's all set")
})

controllers.forEach(controller =>{
    app.use(controller.getPath(),controller.router)
})