import React from 'react'
import { Expense } from 'types'

export default function ExpenseItem({ data }: { data: Expense }) {
  return (
    <div className="flex flex-col border-t-2 border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl	font-semibold">{data.name}</div>

        <div className="text-lg	font-medium text-palette-300">{'$' + data.price}</div>
      </div>

      <div>{data.type}</div>

      <div className="flex items-center justify-between">
        <div>{data.date}</div>

        <div>
          <p className="max-w-min rounded-md border border-green-300 bg-green-200 px-2 py-1">{data.status}</p>
        </div>
      </div>
    </div>
  )
}
