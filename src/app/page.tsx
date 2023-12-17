import { CONNECTION_STRING } from '@/lib/config'
import { ToDoList } from './(features)/to-do-list/ToDoList'
import { YDocProvider } from '@/lib/y-sweet-react'
import { getOrCreateDocAndToken, type ClientToken } from '@y-sweet/sdk'
import { Awareness } from './(features)/awareness/Awareness'

export const dynamic = 'force-static'

type HomeProps = {
  searchParams: Record<string, string>
}

export default async function Home({ searchParams }: HomeProps) {
  let clientToken = null
  try {
    const docAndToken = await getOrCreateDocAndToken(CONNECTION_STRING, searchParams.doc)
    clientToken = docAndToken
    console.log('sync connected')
  } catch (e) {
    console.log('sync disconnected')
    clientToken = { url: '', docId: 'local' }
  }

  return (
    <>
      {clientToken && (
        <YDocProvider clientToken={clientToken} setQueryParam="doc">
          <Awareness />
          <ToDoList />
        </YDocProvider>
      )}
    </>
  )
}
