import { useState, useEffect } from 'react'
import { HorariosData, EventosData } from '@/types/data'

export function useData<T extends HorariosData | EventosData>(url: string): [T | null, boolean] {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Error al cargar los datos')
        }
        const result = await response.json()
        setData(result as T)
      } catch (error) {
        console.error('Error loading data:', error)
        setError(error instanceof Error ? error.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return [data, loading]
}
