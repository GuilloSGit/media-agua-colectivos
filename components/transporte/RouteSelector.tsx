interface RouteSelectorProps {
  activeRoute: string
  setActiveRoute: (route: string) => void
}

export default function RouteSelector({ activeRoute, setActiveRoute }: RouteSelectorProps) {
  const routes = [
    { key: "media-agua-capital", from: "Media Agua", to: "Capital" },
    { key: "capital-media-agua", from: "Capital", to: "Media Agua" },
    { key: "media-agua-distritos", from: "Media Agua", to: "Distritos" },
    { key: "distritos-media-agua", from: "Distritos", to: "Media Agua" },
    { key: "media-agua-caucete", from: "Media Agua", to: "Caucete" },
    { key: "caucete-media-agua", from: "Caucete", to: "Media Agua" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          value={activeRoute}
          onChange={(e) => setActiveRoute(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar ruta</option>
          {routes.map((route) => (
            <option key={route.key} value={route.key}>
              {route.from} → {route.to}
            </option>
          ))}
        </select>
    </div>
  )
}
