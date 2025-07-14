import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Phone, Users } from "lucide-react"

export default function ContactoInfo() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Información de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-blue-600" />
            <div>
              <div className="font-medium">Teléfono Municipal</div>
              <div className="text-gray-600">(0264) 123-4567</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-blue-600" />
            <div>
              <div className="font-medium">Dirección</div>
              <div className="text-gray-600">Av. San Martín 123, Media Agua, Sarmiento, San Juan</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-blue-600" />
            <div>
              <div className="font-medium">Horario de Atención</div>
              <div className="text-gray-600">Lunes a Viernes: 8:00 - 16:00</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Empresas de Transporte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="font-medium">Empresa San Juan</div>
            <div className="text-gray-600">Tel: (0264) 111-2222</div>
          </div>

          <Separator />

          <div>
            <div className="font-medium">Transporte Valle</div>
            <div className="text-gray-600">Tel: (0264) 333-4444</div>
          </div>

          <Separator />

          <div>
            <div className="font-medium">Transporte Local</div>
            <div className="text-gray-600">Tel: (0264) 555-6666</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
