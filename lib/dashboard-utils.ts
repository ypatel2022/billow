import { Expense } from 'types'

export default function optimize(data: Expense[]): any {
  const purchaseTypes = [
    {
      id: 1,
      type: 'Groceries',
      essential: 1,
      weight: 8,
    },
    {
      id: 2,
      type: 'Medical',
      essential: 1,
      weight: 10,
    },
    {
      id: 3,
      type: 'Housing',
      essential: 1,
      weight: 9,
    },
    {
      id: 4,
      type: 'Debt Payment',
      essential: 1,
      weight: 9,
    },
    {
      id: 5,
      type: 'Savings',
      essential: 0,
      weight: 3,
    },
    {
      id: 6,
      type: 'Entertainment',
      essential: 0,
      weight: 1,
    },
    {
      id: 7,
      type: 'Other',
      essential: 0,
      weight: 2,
    },
  ]

  let totalSpending = 0,
    nonEssentialSpending = 0,
    nonEssentialCounter = 0,
    entertainmentCounter = 0,
    entertainmentPrice = 0,
    otherCounter = 0,
    otherPrice = 0,
    averagePurchaseWeight = 0,
    greatestPurchase = ''

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < purchaseTypes.length; j++) {
      if (data[i].type == purchaseTypes[j].type) {
        if (purchaseTypes[j].essential == 0) {
          nonEssentialSpending += data[i].price
          nonEssentialCounter++
          if (data[i].type == 'Entertainment') {
            entertainmentCounter++
            entertainmentPrice += data[i].price
          } else if (data[i].type == 'Other') {
            otherCounter++
            otherPrice += data[i].price
          }
        }
        if (otherPrice > entertainmentPrice) {
          greatestPurchase = 'Other'
        } else if (otherPrice < entertainmentPrice) {
          greatestPurchase = 'Entertainment'
        }
        averagePurchaseWeight += purchaseTypes[j].weight
        totalSpending += data[i].price
      }
    }
  }

  let res = {
    nonEssentialSpendingRatio: Math.round((nonEssentialSpending / totalSpending) * 100),
    nonEssentialPurchases: nonEssentialCounter,
    entertainmentPurchases: entertainmentCounter,
    entertainmentCost: entertainmentPrice,
    otherPurchases: otherCounter,
    otherCost: otherPrice,
    greatestCost: greatestPurchase,
    averagePurchaseWeight: Math.round(averagePurchaseWeight / data.length),
  }
  console.log(res)
  return res
}
