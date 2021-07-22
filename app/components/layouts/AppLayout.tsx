import { ReactNode } from 'react'

export default function AppLayout({
  children,
  title,
}: {
  children?: ReactNode
  title: string
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow h-full"></div>

      <div className="max-w-md w-full mx-auto p-4 flex-shrink-0 flex-grow-0">
        <div className="text-center">
          <h1 className="font-serif text-5xl mb-2">{title}</h1>
        </div>
        <div className="p-4 md:p-6 border rounded border-gray-200 w-full mt-4">
          {children}
        </div>
      </div>

      <div className="flex-grow h-full"></div>
    </div>
  )
}
