'use client'
import VirtualizedComponent from '@/components/VirtualizedComponent'
import UseMemoComponent from '@/components/UseMemoComponent'
import MemoizedComponent from '@/components/MemoizedComponent'
import RegularComponent from '@/components/RegularComponent'
import memoizedFactorial from '@/functions/memoizedFactorial'

import { useState } from 'react'
import { Product } from '@/interfaces'

const products: Product[] = [
  { id: 1, name: 'Product A', price: 10 },
  { id: 2, name: 'Product B', price: 20 },
  { id: 3, name: 'Product C', price: 15 },
]

export default function Home() {
  const [dataProducts, setDataProducts] = useState<Product[]>(products)
  const [count, setCount] = useState(0)
  const [calculatedFactorial, setCalculatedFactorial] = useState<number | null>(
    null
  )

  const handleFactorial = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = Number(e.currentTarget.value)
    const result = memoizedFactorial(value)
    setCalculatedFactorial(result)
  }

  return (
    <main className="container mx-auto flex flex-col gap-5">
      <div className="my-10">
        <h1 className="text-5xl font-bold text-white text-center ">
          Efficient Data Optimization with React:
        </h1>
        <h2 className="text-4xl font-bold text-white text-center ">
          Strategies and Best Practices (check clg)
        </h2>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center gap-3">
        <div className="flex flex-col gap-3">
          <div className="border border-white text-center p-5">
            <h1 className="text-xl font-bold">useCallback and useMemo</h1>
            <UseMemoComponent
              data={dataProducts.map((product) => product.price)}
              setDataProducts={setDataProducts}
            />
          </div>
          <div className="border border-white text-center p-5">
            <h1 className="text-xl font-bold">Virtualized List</h1>
            <VirtualizedComponent />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="border border-white text-center p-5">
            <h1 className="text-xl font-bold">Memo Component</h1>
            <button
              className="bg-blue-500 border px-2 py-1 rounded-md"
              onClick={() => setCount(count + 1)}
            >
              Increment Count
            </button>
            <span className="flex gap-2 justify-center">
              Regular: <RegularComponent value={count} />
            </span>
            <span className="flex gap-2 justify-center">
              Memoized: <MemoizedComponent value={count} />
            </span>
          </div>
          <div className="border border-white text-center p-5">
            <h1 className="text-xl font-bold ">
              Memoized Factorial Using Lodash
            </h1>
            <button onClick={handleFactorial} value={5}>
              Calculate Factorial of 5
            </button>
            {calculatedFactorial !== null && (
              <p>Factorial of 5: {calculatedFactorial}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
