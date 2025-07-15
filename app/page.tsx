"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Header from "@/components/transporte/Header"
import Navigation from "@/components/transporte/Navigation"
import Footer from "@/components/transporte/Footer"
import RouteSelector from "@/components/transporte/RouteSelector"
import DayTypeSelector from "@/components/transporte/DayTypeSelector"
import HorariosList from "@/components/transporte/HorariosList"
import EventosList from "@/components/transporte/EventosList"
import ContactoInfo from "@/components/transporte/ContactoInfo"
import { useData } from '@/hooks/useData'
import { HorariosData, EventosData, Horario } from '@/types/data'

const DISTRICTOS = {
  "media-agua-distritos": [
    "Cochagual",
    "Tres Esquinas",
    "Los Berros",
    "Cienaguita",
    "San Carlos",
    "Las Lagunas",
    "Pedernal"
  ],
  "distritos-media-agua": [
    "Cochagual",
    "Tres Esquinas",
    "Los Berros",
    "Cienaguita",
    "San Carlos",
    "Las Lagunas",
    "Pedernal"
  ]
}


export default function MediaAguaColectivos() {
  const basePath = process.env.NODE_ENV === 'production' ? '/media-agua-colectivos' : '';
  const [activeSection, setActiveSection] = useState("horarios")
  const [activeRoute, setActiveRoute] = useState("media-agua-capital")
  const [activeDayType, setActiveDayType] = useState<'lunes-viernes' | 'sabados-domingos-feriados'>("lunes-viernes")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [horarios, loadingHorarios] = useData<HorariosData>(`${basePath}/data/horarios.json`)
  const [eventos, loadingEventos] = useData<EventosData>(`${basePath}/data/eventos.json`)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 300000)

    return () => clearInterval(timer)
  }, [])

  const getNextScheduleIndex = (schedules: any[]) => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute

    for (let i = 0; i < schedules.length; i++) {
      const [hour, minute] = schedules[i].hora.split(":").map(Number)
      const scheduleTimeInMinutes = hour * 60 + minute

      if (scheduleTimeInMinutes > currentTimeInMinutes) {
        return i
      }
    }

    return -1
  }

  if (loadingHorarios || loadingEventos) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-900">Cargando datos...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (!horarios || !eventos) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-900">Error al cargar los datos</h1>
            <p className="text-red-600">Por favor, intenta recargar la página</p>
          </div>
        </div>
      </div>
    )
  }

  const renderHorarios = () => {
    // Obtener los horarios actuales
    const currentSchedules = horarios?.[activeRoute as keyof typeof horarios]?.[activeDayType as 'lunes-viernes' | 'sabados-domingos-feriados'] ?? []
    
    // Agrupar horarios por distrito
    const groupedSchedules = activeRoute === "media-agua-distritos" || activeRoute === "distritos-media-agua"
      ? currentSchedules.reduce((acc: { [key: string]: Horario[] }, schedule: Horario) => {
          const key = activeRoute === "media-agua-distritos" ? schedule.destino : schedule.origen
          if (!key || !DISTRICTOS[activeRoute].includes(key)) return acc
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(schedule)
          return acc
        }, {})
      : { default: currentSchedules }

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-blue-900">Horarios</h2>
          <p className="text-gray-600">Consulta los horarios actualizados de todas las líneas</p>
        </div>

        <div className="flex flex-col w-full gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-4 sm:items-start sm:justify-start sm:gap-2">
          <RouteSelector activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
          <DayTypeSelector activeDayType={activeDayType} setActiveDayType={setActiveDayType} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col">
              <div>
                <CardTitle className="text-lg font-semibold">
                  {activeRoute === "media-agua-capital" && "Media Agua → Capital"}
                  {activeRoute === "capital-media-agua" && "Capital → Media Agua"}
                  {activeRoute === "media-agua-distritos" && "Media Agua → Distritos"}
                  {activeRoute === "distritos-media-agua" && "Distritos → Media Agua"}
                  {activeRoute === "media-agua-caucete" && "Media Agua → Caucete"}
                  {activeRoute === "caucete-media-agua" && "Caucete → Media Agua"}
                </CardTitle>
                <CardDescription>
                  Horarios vigentes - {activeDayType === "lunes-viernes" ? "Lunes a Viernes" : "Sábados, Domingos y Feriados"} - Actualizado el {new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                </CardDescription>
              </div>
              <div className="mt-2 flex flex-row items-center justify-between gap-2 bg-blue-50 p-2 rounded">
                <div className="flex flex-row items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Hora actual: {currentTime.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Argentina/San_Juan" })}</span>
                </div>
                {(() => {
                  const currentDayType = new Date().getDay() === 0 || new Date().getDay() === 6 
                    ? 'sabados-domingos-feriados' 
                    : 'lunes-viernes'
                  const nextIndex = getNextScheduleIndex(currentSchedules)
                  return currentDayType === activeDayType && nextIndex !== -1 ? (
                    <div className="text-xs">
                      <Badge>
                        <span className="text-xs">{currentSchedules.length - nextIndex} servicios restantes</span>
                      </Badge>
                    </div>
                  ) : null
                })()}
              </div>
            </div>
          </CardHeader>
          {horarios && (
            <div className="space-y-4">
              {Object.entries(groupedSchedules)
            .filter(([district]) => district !== undefined)
            .map(([district, schedules]) => (
                <div key={district}>
                  {activeRoute === "media-agua-distritos" || activeRoute === "distritos-media-agua" ? (
                    <h3 className="text-lg font-semibold my-2 mx-6">
                      {activeRoute === "media-agua-distritos" ? `A ${district}` : `Desde ${district}`}
                    </h3>
                  ) : null}
                  <HorariosList
                    horarios={schedules}
                    currentTime={currentTime}
                    getNextScheduleIndex={getNextScheduleIndex}
                    activeDayType={activeDayType}
                  />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    )
  }

  const renderContacto = () => (
    <ContactoInfo />
  )

  const renderEventos = () => {
    return eventos && <EventosList eventos={eventos} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <Header />
  
      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
  
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {activeSection === "horarios" && renderHorarios()}
        {activeSection === "contacto" && renderContacto()}
        {activeSection === "eventos" && renderEventos()}
      </main>
  
      {/* Footer */}
      <Footer />
    </div>
  )
}
