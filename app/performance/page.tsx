'use client'
import VirtualizedComponent from '@/components/VirtualizedComponent'
import UseMemoComponent from '@/components/UseMemoComponent'
import MemoizedComponent from '@/components/MemoizedComponent'
import RegularComponent from '@/components/RegularComponent'
import memoizedFactorial from '@/functions/memoizedFactorial'
import { calculateFactorial } from '@/functions/memoizedFactorial'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

import { useState } from 'react'
import { Product } from '@/interfaces'

const products: Product[] = [
  { id: 1, name: 'Product A', price: 10 },
  { id: 2, name: 'Product B', price: 20 },
  { id: 3, name: 'Product C', price: 15 },
]

export default function Home() {
  const [dataProducts, setDataProducts] = useState<Product[]>(products)
  const [memoCount, setMemoCount] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const inputValue = parseInt((e.target as any).elements.factorial.value)

    // Without memoization
    console.time('Without Memoization')
    calculateFactorial(inputValue)
    console.timeEnd('Without Memoization')

    // With memoization
    console.time('With Memoization')
    memoizedFactorial(inputValue)
    console.timeEnd('With Memoization')
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

      <Card title="Important">
        <p>
          To check each functionality, open the console and click on the buttons
          below.
        </p>
      </Card>
      <div className="flex flex-col md:flex-row md:justify-center gap-3 ">
        <div className="flex flex-col gap-3 flex-1">
          <Card title="useCallback and useMemo">
            <UseMemoComponent
              data={dataProducts.map((product) => product.price)}
              setDataProducts={setDataProducts}
            />
          </Card>
          <Card title="Virtualized List Component">
            <p>
              This component is recycling rows, it only renders the visible
              items, when you scroll down it reuses the components that are not
              visible anymore.
            </p>
            <VirtualizedComponent />
          </Card>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <Card title="Memo Component">
            <Button onClick={() => setMemoCount(memoCount + 1)}>
              Increment Count
            </Button>
            <span className="flex gap-2 justify-center">
              Regular: <RegularComponent value={memoCount} />
            </span>
            <span className="flex gap-2 justify-center">
              Memoized: <MemoizedComponent value={memoCount} />
            </span>
          </Card>

          <Card title="Memoized Factorial">
            <form onSubmit={handleSubmit}>
              <input
                type="string"
                name="factorial"
                className="text-black block mx-auto mb-5 rounded text-lg"
                maxLength={2}
              />
              <Button color="secondary" type="submit">
                Calculate Factorial
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </main>
  )
}
