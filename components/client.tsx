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
    inputRef.current.selectionStart = position + 1
    inputRef.current.selectionEnd = position + 1
  }, [value])

  useEffect(() => {
    txs.length !== 0 &&
      // setValue(txs[txs.length - 1].value)
      console.log({txs})
      const last = txs.slice(-1).pop()
      console.log({last})
      if (last && last.back === null) {
        setValue(last.value + value)
      }
  }, [txs])

  function handleChange(e : any){
    console.log({e})
    const tx = {
      id: nanoid(),
      client,
      value: e.target.value,
      front: null,
      back: null
    }
    console.log({tx})
    setTxs([...txs, tx])
  }

  function handleKeyUp(e: any) {
    const value = e.key
    const position = e.target.selectionStart
    const front = position
    const back = null

    const tx = {
      id: nanoid(),
      client,
      value,
      // front: front !== null ? txs[front].id : null,
      // back: back !== null ? txs[back].id : null
      front: null,
      back: null,
    }
    console.log({tx})
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
