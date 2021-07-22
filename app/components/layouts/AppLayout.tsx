import Head from 'next/head'
import React, { ReactNode } from 'react'
import { useAuth } from '../../models'
import Button from '../Button'

export default function AppLayout({ children }: { children?: ReactNode }) {
  const auth = useAuth()

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Head>
        <title>Virtual Whiteboard</title>
        <meta
          name="description"
          content="A virtual whiteboard to share with your colleagues"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex-1">{children}</main>
      <footer className="flex flex-col justify-center items-center p-3">
        <Button secondary onClick={() => auth.signOut()}>
          Sign out
        </Button>
        <p className="text-sm text-gray-500">
          A virtual whiteboard service developed by Magnus Meng Mortensen
        </p>
      </footer>
    </div>
  )
}
