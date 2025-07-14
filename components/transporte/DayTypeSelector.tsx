import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface DayTypeSelectorProps {
  activeDayType: 'lunes-viernes' | 'sabados-domingos-feriados'
  setActiveDayType: (type: 'lunes-viernes' | 'sabados-domingos-feriados') => void
}

export default function DayTypeSelector({ activeDayType, setActiveDayType }: DayTypeSelectorProps) {
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant={activeDayType === "lunes-viernes" ? "default" : "outline"}
        onClick={() => setActiveDayType("lunes-viernes")}
        className="flex items-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        Lunes a Viernes
      </Button>
      <Button
        variant={activeDayType === "sabados-domingos-feriados" ? "default" : "outline"}
        onClick={() => setActiveDayType("sabados-domingos-feriados")}
        className="flex items-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        Sábados, Domingos y Feriados
      </Button>
    </div>
  )
}
