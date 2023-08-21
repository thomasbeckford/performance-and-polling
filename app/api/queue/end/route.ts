// REPLACE THIS CODE FOR DELETE FROM THE QUEUE

import { NextResponse } from 'next/server'
import { usersQueue } from '../../queues/users/route'

export async function POST(req: Request) {
  const { userData } = await req.json()

  try {
    await usersQueue.delete(userData.id)

    return NextResponse.json({
      message: `UserID ${userData.id} set up in the queue`,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
