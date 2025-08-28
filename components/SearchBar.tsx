'use client'

import { useState } from 'react'

interface Props {
  onSearch: (query: string) => void
}

/**
 * Simple search bar that calls the provided callback whenever the
 * input changes.  It holds local state for the input value so that
 * the parent component does not need to manage intermediate keystrokes.
 */
export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setValue(q)
    onSearch(q)
  }

  return (
    <div className="my-4">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search drinks..."
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}