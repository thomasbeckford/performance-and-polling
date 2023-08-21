import { NextResponse } from 'next/server'
import { usersQueue } from '../../queues/users/route'

export async function POST(req: Request) {
  const { userData } = await req.json()

  try {
    await usersQueue.enqueue(userData, {
      id: userData.id,
      delay: '10s',
      exclusive: true,
    })

    // send a request to the blockchain with the nft_id and blockhain needs to tell /api/queue/enqueued/route.ts if the NFT can be minted or not
    // if the NFT can be minted, we can return a response with the status ticket_available

    const blockchainRequest = await fetch(
      'https://api.blockchain.com/v3/exchange/l2/l3/spot_price',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nft_id: userData.id,
        }),
      }
    )

    const blockchainResponse = await blockchainRequest.json()


    if (blockchainResponse.status === 200) {
      return NextResponse.json({
        status: 'ticket_available',
        message: `User ${userData.id} is able to buy a ticket`,
      })
    }

    // if the NFT can't be minted, we can return a response with the status enqueued

    return NextResponse.json({
      status: 'enqueued',
      message: `Checking in the blockchain if the NFT can be minted with the state (available, sold, etc)`,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
