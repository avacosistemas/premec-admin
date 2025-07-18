import { MatTableDataSource } from "@angular/material/table";

export interface FichadoApiResponse {
    status: string;
    data: FichadoEmpleado[];
}

export interface FichadoEmpleado {
    empleado: Empleado;
    fichados: FichadoDetalle[];
}

export interface Empleado {
    username: string;
    nombre: string;
    apellido: string;
    usuarioSap: string;
    legajo: number;
    nombreCompleto?: string;
    fichados?: MatTableDataSource<FichadoDetalle>;
}

export interface FichadoDetalle {
    dia: string;
    fecha: string;
    entrada1: string;
    salida1: string;
    entrada2: string;
    salida2: string;
    totalDia: string;
    descanso: string;
    normal: string;
    extra50: string;
    extra100: string;
    horaNoTipificada: string;
    tarde: string;
    comentarios: string;
    horasProductivas: number | null;
}

export interface FichadoSendPayload {
    fichados: FichadoEmpleado[];
}