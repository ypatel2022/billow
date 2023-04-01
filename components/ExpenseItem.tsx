import React from 'react'
import { Expense } from 'types'

export default function ExpenseItem({ data }: { data: Expense }) {
  return (
    <div className="flex flex-col gap-1 border-t-2 border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl	font-semibold">{data.name}</div>

        <div className="text-lg	font-medium text-palette-300">{'$' + data.price}</div>
      </div>

      <div className="text-sm">{data.type}</div>

      <div className="flex items-center justify-between">
        <div className="text-sm">{data.date}</div>

        <div>
          <p className="max-w-min text-sm rounded-md border border-green-300 bg-green-200 px-2 py-1 ml-3">{data.status}</p>
        </div>
      </div>
    </div>
  )
}
