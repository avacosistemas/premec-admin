export interface NovedadesContadorApiResponse {
    status: string;
    data: NovedadesContadorData;
}

export interface NovedadesContadorData {
    periodo: string;
    jornales: Jornal[];
    fueraConvenio: FueraConvenio[];
    mensual: Mensual[];
}

export interface Jornal {
    legajo: string;
    apellido: string;
    nombre: string;
    cuil: string;
    categoria: string | null;
    valorHora: string;
    feriado: string;
    hsNormales: string;
    feriadoExtra: string;
    adelantoSueldo: string | null;
    prestamos: string | null;
    hs50: string;
    hs100: string;
    gratificaciones: string | null;
    tarde: string | null;
    novedades: string | null;
    premio: string;
    comida: string;
    ausencias: string | null;
    hsProductivas: string | null;
}

export interface FueraConvenio {
    legajo: string;
    apellido: string;
    nombre: string;
    cuil: string;
    categoria: string | null;
    feriado: string;
    adelantoSueldo: string | null;
    prestamos: string | null;
    gratificaciones: string | null;
    tarde: string | null;
    novedades: string | null;
    ausencias: string | null;
}

export interface Mensual {
    legajo: string;
    apellido: string;
    nombre: string;
    cuil: string;
    categoria: string | null;
    valorHora: string;
    feriado: string;
    hsNormales: string;
    feriadoExtra: string;
    adelantoSueldo: string | null;
    prestamos: string | null;
    hs50: string;
    hs100: string;
    gratificaciones: string | null;
    tarde: string | null;
    novedades: string | null;
    premio: string;
    comida: string;
    ausencias: string | null;
}