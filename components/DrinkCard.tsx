import Link from 'next/link'
import type { Drink } from '../lib/types'

interface Props {
  drink: Drink
}

/**
 * Displays a brief summary of a drink.  The card includes the drink
 * name, origin and year, and links to a dedicated detail page.
 */
export default function DrinkCard({ drink }: Props) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-blue-700">
        <Link href={`/drink/${drink.id}`}>{drink.name}</Link>
      </h2>
      <p className="text-sm text-gray-500">
        {drink.originCountry}
        {drink.region ? ` (${drink.region})` : ''} – {drink.yearIntroduced}
      </p>
      <p className="mt-2 text-sm text-gray-700 line-clamp-3">
        {drink.description}
      </p>
    </div>
  )
}