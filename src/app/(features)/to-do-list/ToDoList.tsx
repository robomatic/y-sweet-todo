'use client'

import { useArray } from '@/lib/y-sweet-react'
import { useCallback, useState } from 'react'
import * as Y from 'yjs'
import Title from '@/components/Title'
import { Button } from '@/components/Button'

type ToDoItem = {
  text: string
  done: boolean
}

export function ToDoInput(props: { onItem: (text: string) => void }) {
  const [text, setText] = useState('')
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      props.onItem(text)
      setText('')
    },
    [props, text],
  )

  const changeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
    },
    [setText],
  )

  return (
    <form onSubmit={onSubmit} className="flex flex-row space-x-2 w-full">
      <input
        type="text"
        value={text}
        onChange={changeCallback}
        className="bg-white/20 grow basis-full block ring-sky-900 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset
                 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900
                sm:text-sm sm:leading-6"
      />
      <Button type="submit">Add</Button>
    </form>
  )
}

type ToDoItemProps = {
  item: Y.Map<any>
}

export function ToDoItem({ item }: ToDoItemProps) {
  const clickCallback = useCallback(() => {
    item.set('done', !item.get('done'))
  }, [item])

  return (
    <label className="flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        className="w-6 h-6 cursor-pointer accent-sky-300"
        checked={item.get('done')}
        onChange={clickCallback}
      />
      <input
        className="bg-transparent p-1 rounded text-sky-950 text-lg focus:bg-white/20"
        value={item.get('text')}
        onChange={(e) => item.set('text', e.target.value)}
      />
    </label>
  )
}

export function ToDoList() {
  const items = useArray<Y.Map<any>>('todolist')

  const pushItem = useCallback(
    (text: string) => {
      let item = new Y.Map([
        ['text', text],
        ['done', false],
      ] as [string, any][])

      items?.push([item])
    },
    [items],
  )

  const clearCompleted = useCallback(() => {
    let indexOffset = 0
    items?.forEach((item, index) => {
      if (item.get('done')) {
        items.delete(index - indexOffset, 1)
        indexOffset += 1
      }
    })
  }, [items])

  return (
    <div className="space-y-4 px-4 py-2 lg:px-8 lg:py-3 max-w-screen-sm">
      <div className="flex gap-2 items-center justify-between w-full">
        <Title>To-do List</Title>
        <button className="px-3 py-1 bg-lime-600/30 text-zinc-100/80 tracking-wide text-xs rounded-full" onClick={clearCompleted}>clear completed</button>
      </div>
      <ToDoInput onItem={pushItem} />
      <div className="space-y-1">
        {items && items.map((item, index) => <ToDoItem key={index} item={item} />)}
      </div>
    </div>
  )
}
