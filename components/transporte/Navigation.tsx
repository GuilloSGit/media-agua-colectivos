"use client"

import { Clock, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex gap-1">
          <Button
            variant={activeSection === "horarios" ? "default" : "ghost"}
            onClick={() => setActiveSection("horarios")}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
          >
            <Clock className="h-4 w-4 mr-2" />
            Horarios
          </Button>
          <Button
            variant={activeSection === "contacto" ? "default" : "ghost"}
            onClick={() => setActiveSection("contacto")}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
          >
            <Phone className="h-4 w-4 mr-2" />
            Contacto
          </Button>
          <Button
            variant={activeSection === "eventos" ? "default" : "ghost"}
            onClick={() => setActiveSection("eventos")}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Eventos
          </Button>
        </div>
      </div>
    </nav>
  )
}
