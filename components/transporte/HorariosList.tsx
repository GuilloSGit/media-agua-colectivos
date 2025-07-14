import { Badge } from "@/components/ui/badge"

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
          <div
            key={index}
            className={`relative flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
              isNext && currentDayType === activeDayType
                ? "bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300 shadow-lg transform scale-[1.02] m-2"
                : isPast
                  ? "bg-blue-50 opacity-80 m-2"
                  : "bg-gray-50 hover:bg-gray-100 m-2"
            }`}
          >
            {isNext && (
              <div className="absolute -top-2 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                Próximo
              </div>
            )}

            <div className="flex items-center gap-3">
              <div
                className={`text-2xl font-bold ${
                  isNext ? "text-green-600" : isPast ? "text-gray-700" : "text-blue-600"
                }`}
              >
                {horario.hora}
              </div>
              <div>
                <div className={`font-medium ${isPast ? "text-gray-700" : "text-gray-900"}`}>
                  {horario.empresa}
                </div>
              </div>
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
        )
      })}
    </div>
  )
}
