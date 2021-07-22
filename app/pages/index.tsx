import AppLayout from '../components/layouts/AppLayout'

export default function Home() {
  return (
    <AppLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-center text-4xl font-serif">Team name goes here</h1>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="bg-white cursor-pointer rounded border border-gray-200 p-6 group hover:shadow-md hover:border-indigo-500 active:shadow-sm">
            <h2 className="font-serif text-2xl">Whiteboard name here</h2>
            <p className="text-gray-700 text-sm">A small slerp here...</p>
          </div>

          <div className="cursor-pointer rounded border border-gray-200 p-6 group hover:shadow-md hover:border-indigo-500 active:shadow-sm">
            <h2 className="text-center font-serif text-2xl">+</h2>
            <p className="text-center text-gray-700 text-sm">Add a new board</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
