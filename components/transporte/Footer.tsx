export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-gray-300">© 2025 Municipalidad de Media Agua, Sarmiento, San Juan</p>
          <div className="flex flex-row flex-wrap gap-2 items-center justify-center mt-2">
            <span className="text-xs">Desarrollado por 云贵正 - 2025</span>
            <a className="text-xs" href="mailto:admin@ga-software.dev" target="_blank" rel="noopener noreferrer">admin@ga-software.dev</a>
            <span className="text-xs">WhatsApp:</span> <a className="text-xs" href="https://wa.me/5493876295801" target="_blank" rel="noopener noreferrer">+54 9 387 629-5801</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
