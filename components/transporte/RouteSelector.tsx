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
    <div className="w-full md:max-w-sm flex flex-col gap-2">
      <fieldset className="flex flex-col gap-2 p-2 border border-gray-300 rounded-md pb-6">
        <legend className="text-xs">Seleccione la ruta</legend>
        <select
          id="routeSelector"
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
      </fieldset>
    </div>
  )
}
