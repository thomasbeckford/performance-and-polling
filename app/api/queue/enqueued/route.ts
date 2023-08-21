// REPLACE THIS CODE FOR: CHECK A PLACE IN THE QUEUE

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userData } = await req.json()

  try {
    // here we need to check in the blockchain if the NFT can be minted with the state (available, sold, etc)
    // if the NFT can be minted, we can return a response with the status ticket_available
    // if the NFT can't be minted, we can return a response with the status enqueued

    const enqueuedResponse = NextResponse.json({
      status: 'enqueued',
      message: `User ${userData.id} is still enqueued`,
    })

    const availableResponse = NextResponse.json({
      status: 'ticket_available',
      message: `User ${userData.id} is able to buy a ticket`,
    })

    return availableResponse
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
