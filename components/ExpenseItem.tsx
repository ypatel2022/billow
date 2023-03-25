import React from 'react'
import { Expense } from 'types'

export default function ExpenseItem({ data }: { data: Expense }) {
  return (
    <div className="border-t-2 border-gray-200 p-2">
      <div className="flex items-center justify-between">
        <div>{data.name}</div>

        <div>{data.price}</div>
      </div>

      <div>{data.type}</div>

      <div>{data.date}</div>

      <div>
        <p className="max-w-min border border-green-300 bg-green-200 px-2 py-1">{data.status}</p>
      </div>
    </div>
  )
}
