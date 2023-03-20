import React from 'react'

export default function ExpenseItem({ data }: any) {
  return (
    <div className="border-x-2 border-t-2 border-gray-200">
      <div>{data.price}</div>

      <div>{data.location}</div>

      <div>{data.type}</div>

      <div>{data.date}</div>
    </div>
  )
}
