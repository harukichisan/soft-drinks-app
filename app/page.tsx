'use client'

import { useEffect, useState } from 'react'
import type { Drink } from '../lib/types'
import { drinks as staticDrinks } from '../lib/data'
import { supabase } from '../lib/supabaseClient'
import SearchBar from '../components/SearchBar'
import DrinkCard from '../components/DrinkCard'

/**
 * The home page lists all available soft drinks and provides a search
 * field to filter by name, country or region.  It attempts to load
 * data from Supabase; if that fails it falls back to a static dataset.
 */
export default function HomePage() {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [filtered, setFiltered] = useState<Drink[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('drinks')
            .select('*')
            .order('name', { ascending: true })
          if (error) throw error
          if (data) {
            setDrinks(data as Drink[])
            setFiltered(data as Drink[])
            return
          }
        }
      } catch (err) {
        console.warn('Supabase fetch error, falling back to static data:', err)
      }
      // fallback
      setDrinks(staticDrinks)
      setFiltered(staticDrinks)
    }
    fetchDrinks().finally(() => setLoading(false))
  }, [])

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(drinks)
      return
    }
    const q = query.toLowerCase()
    setFiltered(
      drinks.filter((d) => {
        return (
          d.name.toLowerCase().includes(q) ||
          d.originCountry.toLowerCase().includes(q) ||
          (d.region && d.region.toLowerCase().includes(q))
        )
      })
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-1">World Soft Drinks</h1>
      <p className="text-gray-600 mb-4">
        Explore and discover soft drinks from around the world.
      </p>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading…</p>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </div>
      ) : (
        <p>No drinks found.</p>
      )}
    </main>
  )
}