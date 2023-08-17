'use client'
import React, { useState, useMemo, useCallback } from 'react'
import { Product } from '@/interfaces'
import Button from '@/components/ui/Button'

interface UseMemoComponentProps {
  data: number[]
  setDataProducts?: React.Dispatch<React.SetStateAction<Product[]>>
}

const UseMemoComponent: React.FC<UseMemoComponentProps> = ({
  data,
  setDataProducts,
}) => {
  const [count, setCount] = useState(0)

  const processedData = useMemo(() => {
    if (!data) return []
    console.log('Run complex operation: processedData, because data changed')
    return data.map((item) => item * 2)
  }, [data])

  // useMemo: This hook is used to memoize the result of the data.map operation.
  // It ensures that the calculation is only performed when the data prop changes.
  // If the data prop remains the same between renders, the memoized result will be reused, avoiding redundant calculations.

  const handleClick = useCallback(() => {
    console.log('Re-create function: handleClick(), because count changed')
    setCount(count + 1)
  }, [count])

  // useCallback: handleClick function is created on render, but it is not recreated on every render.
  // It is only recreated when the count state changes.

  const handleRecalculateData = useCallback(() => {
    if (setDataProducts) {
      setDataProducts((prevData) => {
        // Update the products data in a way that triggers a change
        // This will help demonstrate the memoization behavior
        const newData = [...prevData]

        newData.map((item) => {
          item.price = item.price + 1
        })

        return newData
      })
    }
  }, [setDataProducts])

  return (
    <div>
      <ul>
        {processedData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="flex justify-center gap-5 m-10">
        <Button color="secondary" onClick={handleRecalculateData}>
          Expensive operation (recalculate data)
        </Button>

        <Button onClick={handleClick}>Button clicked: {count} times</Button>
      </div>
    </div>
  )
}

export default UseMemoComponent
