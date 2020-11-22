import { Motorista } from "./motorista";
import { Automovel } from "./automovel";

export interface Utilizacao{
    idUtilizacao?: string,
    auto: Automovel,
    motorista: Motorista,
    dataInicio: number,
    dataFim?: number,
    motivo?: string
}
