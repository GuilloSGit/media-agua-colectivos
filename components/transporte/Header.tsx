import { Bus } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bus className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Transporte Media Agua</h1>
              <p className="text-blue-200">Municipalidad de Media Agua, Sarmiento, San Juan</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

