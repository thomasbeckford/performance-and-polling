'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-5">
      <h1 className="text-5xl font-bold text-white text-center ">Topics</h1>
      <Link
        href="/performance"
        className="text-5xl font-bold text-blue-500 text-center underline"
      >
        Performance and optimization
      </Link>
      <Link
        href="/fetching-and-polling"
        className="text-5xl font-bold text-blue-500 text-center underline"
      >
        Fetching and polling
      </Link>
    </main>
  )
}
