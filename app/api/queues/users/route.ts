import { Queue } from 'quirrel/next-app'

type UserData = {
  id: string
  name: string
}

export const usersQueue = Queue(
  'api/queues/users', // 👈 the route it's reachable on
  async (job: UserData) => {
    const { id, name } = job

    // aca lo rajamos de la fila ?
    console.log('Usuario ya no esta mas en la fila', job)
  }
)

export const POST = usersQueue
