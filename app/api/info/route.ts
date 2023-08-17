import { NextRequest, NextResponse } from 'next/server'
import startSocketServer from '@/server/socket'

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function GET(request: NextRequest) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  return NextResponse.json({ data })
}

export default function SOCKET(request: NextRequest, response: NextResponse) {
  startSocketServer() // Start the Socket.IO server
  return NextResponse.next() // Return a 404 response
}
