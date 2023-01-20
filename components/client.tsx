import React, { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'

type ClientProps = {
  color: string
  txs: any
  setTxs: any
  client: string
}

export default function Client({ color, txs, setTxs, client } : ClientProps) {
  const [value, setValue] = useState('')
  const [position, setPosition] = useState(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log({position})
  }, [position])

  useEffect(() => {
    inputRef.current.selectionStart = position + 1
    inputRef.current.selectionEnd = position + 1
  }, [value])

  useEffect(() => {
    if (txs.length !== 0)  {
      const last = txs.slice(-1).pop()
      if (last && last.value === "⌫") {
        console.log('do something!')
        setValue(value.slice(0, last.back - 1) + value.slice(last.back))
        return
      }

      // first character and insertion at beginning
      if (last && last.back === null) {
        setValue(last.value + value)
      } else if (last && last.front === null) {
        setValue(value + last.value)
      } else {
        setValue(value.slice(0,last.back) + last.value + value.slice(last.back))
      }
    }
  }, [txs])

  function handleChange(e : any){
    const tx = {
      id: nanoid(),
      client,
      value: e.target.value,
      front: null,
      back: null
    }
    setTxs([...txs, tx])
  }

  function handleKeyUp(e: any) {
    const value = e.key

    let back
    if (e.target.value.length !== 0 && position === e.target.value.length) { // insertion at end
      back = position
    } else if (position === 0) { // first character OR insertion at beginning
      back = null
    } else if (e.target.value.length !== 0 && position !== e.target.value.length){
      back = position
    } else {
      console.log('no one knows...')
    }

    let front
    if (e.target.value.length !== 0 && position === 0) { // insertion at beginning
      front = position
    } else if (e.target.value.length === 0) { // first character
      front = null
    } else if (e.target.value.length !== 0 && position === e.target.value.length) { // insertion at end
      front = null
    } else {
      front = position
    }

    const tx = {
      id: nanoid(),
      client,
      value: value === "Backspace" ? "⌫" : value,
      back,
      front,
    }
    setTxs([...txs, tx])
  }

  function handleCursorMove(e: any) {
    const position = e.target.selectionStart
    setPosition(position)
  }

  return (
    <div className={`w-2/5 text-2xl`}>
      <div className={`border-4 ${color}`}>
        <div className={"font-mono text-xs text-zinc-400 p-4"}>{client}</div>
        <input
          ref={inputRef}
          // onChange={(e) => handleChange(e)}
          onChange={(e) => console.log('onChange fired!')}
          onKeyUp={(e) => handleKeyUp(e)}
          onClick={(e) => handleCursorMove(e)}
          className={"w-full p-4 outline-none"}
          placeholder="say something"
          value={value}
        />
      </div>

    </div>
  )
}
