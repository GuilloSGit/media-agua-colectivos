import React from "react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

interface Horario {
  hora: string
  empresa: string
  tipo: string
  destino?: string
  origen?: string
}

interface HorariosListProps {
  horarios: Horario[]
  currentTime: Date
  getNextScheduleIndex: (schedules: Horario[]) => number
  activeDayType: 'lunes-viernes' | 'sabados-domingos-feriados'
}

export default function HorariosList({ horarios, currentTime, getNextScheduleIndex, activeDayType }: HorariosListProps) {
  const isWeekday = activeDayType === 'lunes-viernes'
  const isWeekend = activeDayType === 'sabados-domingos-feriados'
  const currentDayType = new Date().getDay() === 0 || new Date().getDay() === 6 ? 'sabados-domingos-feriados' : 'lunes-viernes'

  const nextScheduleIndex = isWeekday && currentDayType === 'lunes-viernes'
    ? getNextScheduleIndex(horarios)
    : isWeekend && currentDayType === 'sabados-domingos-feriados'
      ? getNextScheduleIndex(horarios)
      : -1

  const [showWhatsAppButtons, setShowWhatsAppButtons] = useState<{ [key: number]: boolean }>(() => {
    const initialState: { [key: number]: boolean } = {};
    horarios.forEach((_, index) => {
      initialState[index] = false;
    });
    return initialState;
  })

  const [isMobileMode, setIsMobileMode] = useState(false)
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<number | null>(null)

  useEffect(() => {
    // Limpiar el estado cuando los horarios cambien
    setShowWhatsAppButtons({})
    setSelectedScheduleIndex(null)
  }, [horarios])

  const handleScheduleClick = (index: number) => {
    if (window.innerWidth <= 640) { // sm breakpoint
      setIsMobileMode(true)
      setSelectedScheduleIndex(index)
    }
  }

  const sendWhatsAppInfo = (horario: Horario) => {
    const lineas = [
      `Horario de colectivo para ${activeDayType}`,
      `Hora: ${horario.hora}`,
      `Empresa: ${horario.empresa}`,
      `Tipo: ${horario.tipo}`,
    ]

    if (horario.origen) lineas.push(`\nOrigen: *"${horario.origen}"*`)
    if (horario.destino) lineas.push(`\nDestino: *"${horario.destino}"*`)

    lineas.push(`\nGracias`)

    const mensaje = lineas.join('\n')
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  const handleMouseEnter = (index: number) => {
    setShowWhatsAppButtons(prev => ({ ...prev, [index]: true }))
  }

  const handleMouseLeave = (index: number) => {
    setShowWhatsAppButtons(prev => ({ ...prev, [index]: false }))
  }

  return (
    <div className="grid gap-3 mx-6 my-3">
      {horarios.map((horario, index) => {
        const isNext = index === nextScheduleIndex
        const isPast = nextScheduleIndex > index || nextScheduleIndex === -1

        const getTiempoRestante = () => {
          const [hour, minute] = horario.hora.split(":").map(Number)
          const scheduleTime = new Date()
          scheduleTime.setHours(hour, minute, 0, 0)
          const diffMs = scheduleTime.getTime() - currentTime.getTime()
          const diffMinutes = Math.floor(diffMs / (1000 * 60))

          if (diffMinutes < 60) {
            return `En ${diffMinutes} min`
          } else {
            const hours = Math.floor(diffMinutes / 60)
            const mins = diffMinutes % 60
            return `En ${hours}h ${mins}m`
          }
        }

        return (
          <div key={index} className="flex items-center justify-between"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          onClick={() => handleScheduleClick(index)}
          >
            <div
              key={index}
              className={`relative p-3 rounded-lg transition-all duration-800 flex-grow ${isNext && currentDayType === activeDayType
                ? "bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300 shadow-lg transform scale-[1.02] m-2"
                : isPast
                  ? "bg-blue-50 opacity-80 m-2"
                  : "bg-gray-50 hover:bg-gray-100 m-2"
                }`}
            >
              <div className="flex flex-row items-center justify-between align-center">
                {isNext && (
                  <div className="absolute -top-2 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                    Próximo
                  </div>
                )}
                <div
                  className={`text-2xl font-bold mt-3 ${isNext ? "text-green-600" : isPast ? "text-gray-700" : "text-blue-600"
                    }`}
                >
                  {horario.hora}
                </div>
                {window.innerWidth > 640 && (
                  <div>
                    <div className={`font-medium ${isPast ? "text-gray-700" : "text-gray-900"}`}>
                      {horario.empresa}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={horario.tipo === "Directo" ? "default" : "secondary"}
                  className={isPast ? "opacity-90 bg-blue-100 text-blue-600" : "opacity-90"}
                >
                  {horario.tipo}
                </Badge>
                {isNext && (
                  <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    {getTiempoRestante()}
                  </div>
                )}
              </div>
            </div>
            <div className={`flex items-center justify-center transition-all duration-800 ${showWhatsAppButtons[index] ? 'w-1/6' : 'w-0'}`}>
              <div className={`flex items-center justify-center transition-all duration-800 ${showWhatsAppButtons[index] ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    sendWhatsAppInfo(horario);
                  }}
                  className={`p-2 rounded-full hover:bg-gray-100 flex flex-col items-center gap-2 transition-all duration-800 ${isNext && currentDayType === activeDayType
                    ? "bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300 shadow-lg transform scale-[1.02] m-2"
                    : isPast
                      ? "bg-blue-50 opacity-80 hover:bg-white m-2 px-2 py-2 border-2 border-gray-600"
                      : "bg-gray-50 hover:bg-green-200 m-2 px-2 py-2 border-2 border-gray-600"
                    }`}
                  title="Enviar por WhatsApp"
                >
                  {window.innerWidth <= 640 ? (
                    <span>📝</span>
                  ) : (
                    <span>WhatsApp</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
