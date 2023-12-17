'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePresence, useArray, usePresenceSetter, useAwareness } from '@/lib/y-sweet-react'
import { Button } from '@/components/Button'

type AwarenessUser = {
  name: string
}

export function Awareness() {
  const awareness = useAwareness()
  const [editing, setEditing] = useState(false)
  const [user, setUser] = useState<AwarenessUser | undefined | null>()
  const presence = usePresence()
  const setLocalStateField = usePresenceSetter()
  const handleSetUsername = useCallback((text: string) => {
    if (text) {
      setLocalStateField({ name: text })
      setEditing(false)
    }
  }, [setLocalStateField])

  const showUsernameInput = () => {
    setEditing(true)
  }

  useEffect(() => {
    const userObj = awareness?.getLocalState() as AwarenessUser
    setUser(userObj)

  }, [awareness, presence])

  return (
    <>
      {awareness && (
        <div className="space-y-4 px-4 py-2 lg:px-8 lg:py-3 max-w-screen-sm">
          <div className="hidden">awareness clientID: {awareness?.clientID} doc guid: {awareness?.doc.guid}</div>
          
          <button type="button" onClick={showUsernameInput} className="flex items-center justify-center gap-2 group"><span>My name: {user?.name}</span> <span className="hidden group-hover:inline-block">✍</span></button>

          {Array.from(presence, ([key, value]) => value).map((user, index) => (
            <div key={index}>{user?.name}</div>
          ))}
          {editing && (
            <div className="flex">
              <TextInput onCreateItem={handleSetUsername} />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export function TextInput(props: { onCreateItem?: ((text: string) => void), placeholder?: string }) {
  const [text, setText] = useState('')
 
  const onSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      props.onCreateItem?.(text)
      setText('')
    }
 
  return (
    <form onSubmit={onSubmit} className="flex-1 flex flex-row space-x-2 max-w-2xl">
        <input
          type="text"
          value={text}
          placeholder={props.placeholder}
          onChange={(e) => setText(e.target.value)}
          className="bg-white/20 grow basis-full block ring-sky-900 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset
                 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900
                sm:text-sm sm:leading-6"
        />
        <Button type="submit">Set Display Name</Button>
    </form>
  )
}
