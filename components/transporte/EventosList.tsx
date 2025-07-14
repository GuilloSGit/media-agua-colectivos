import { Calendar, Megaphone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Evento {
  fecha: string
  titulo: string
  descripcion: string
  tipo: string
}

interface EventosListProps {
  eventos: Evento[]
}

export default function EventosList({ eventos }: EventosListProps) {
  return (
    <div className="space-y-4">
      {eventos.map((evento, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {evento.titulo}
                </CardTitle>
                <CardDescription>{evento.fecha}</CardDescription>
              </div>
              <Badge variant="outline">{evento.tipo}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{evento.descripcion}</p>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Megaphone className="h-5 w-5" />
            Aviso Importante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800">
            Para consultas sobre cambios de horarios o servicios especiales, comunícate con la municipalidad al (0264)
            123-4567 o acércate a nuestras oficinas en horario de atención.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
