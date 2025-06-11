export interface ReciboProcesarRequest {
    archivo: string;
    tipo: string;
}

export interface ReciboProcesarResponse {
    legajo: number;
    neto: number;
    nombreCompleto: string;
    periodo: string;
    tipo: string;
}

export interface RecibosProcesarApiResponse {
    status: string;
    data: ReciboProcesarResponse[];
}

export interface ReciboTabla extends ReciboProcesarResponse {
    aprobado: boolean;
    observaciones: string;
}

export interface ReciboAprobarRechazarRequest extends ReciboProcesarResponse {
    aprobado: boolean;
    observaciones: string;
}