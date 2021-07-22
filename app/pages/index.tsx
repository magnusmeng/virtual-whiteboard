import useSWR, { mutate } from 'swr'
import AppLayout from '../components/layouts/AppLayout'
import { useAuth } from '../models'
import IBoard from '../models/board'

export default function Home() {
  const { user, apiClient } = useAuth()

  const { data, error } = useSWR('boards', apiClient)

  const boards = data && (data.data as IBoard[])

  return (
    <AppLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-center text-4xl font-serif">{user?.team?.name}</h1>
        <p className="text-center text-gray-700">Signed in as {user?.name}</p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {boards &&
            boards.map((board, i) => (
              <div
                key={board.id}
                className="bg-white cursor-pointer rounded border border-gray-200 p-6 group hover:shadow-md hover:border-indigo-500 active:shadow-sm"
                onClick={() =>
                  alert(
                    `You cannot edit "${board.name}" because the developer chose not to implement that feature. So sorry.`
                  )
                }
              >
                <h2 className="font-serif text-2xl">{board.name}</h2>
                <p className="text-gray-700 text-sm">A small slerp here...</p>
              </div>
            ))}

          <div
            className="cursor-pointer rounded border border-gray-200 p-6 group hover:shadow-md hover:border-indigo-500 active:shadow-sm"
            onClick={async () => {
              const name = prompt('Please choose a name for your new board')
              if (name) {
                await apiClient.post('boards', {
                  name,
                })
                mutate('boards')
              }
            }}
          >
            <h2 className="text-center font-serif text-2xl">+</h2>
            <p className="text-center text-gray-700 text-sm">Add a new board</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
