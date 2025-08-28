import { notFound } from 'next/navigation'
import type { Drink } from '../../../lib/types'
import { drinks as staticDrinks } from '../../../lib/data'

interface Props {
  params: { id: string }
}

/**
 * Detail page for a single soft drink.  It looks up the drink in the
 * static dataset by its slug (id).  If no matching drink is found a
 * 404 page is rendered.
 */
export default function DrinkDetailPage({ params }: Props) {
  const { id } = params
  const drink: Drink | undefined = staticDrinks.find((d) => d.id === id)
  if (!drink) {
    return notFound()
  }
  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-1">{drink.name}</h1>
      <p className="text-gray-600">
        {drink.originCountry}
        {drink.region ? ` (${drink.region})` : ''} – {drink.yearIntroduced}
      </p>
      <p className="mt-4 text-lg leading-relaxed">{drink.description}</p>
    </main>
  )
}