export interface Horario {
  hora: string
  empresa: string
  tipo: string
  destino?: string
  origen?: string
}

export interface Evento {
  fecha: string
  titulo: string
  descripcion: string
  tipo: string
}

export interface HorariosData {
  [ruta: string]: {
    'lunes-viernes': Horario[]
    'sabados-domingos-feriados': Horario[]
  }
}

export interface EventosData extends Array<Evento> {}
