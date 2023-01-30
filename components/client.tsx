import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import { nanoid } from 'nanoid'

type tx = {
  id: string
  client: string
  value: string
  back: string
  front: string
}

type ClientProps = {
  color: string
  txs: tx[]
  setTxs: (txs: tx[]) => void
  client: string
}

export default function Client({ color, txs, setTxs, client }: ClientProps) {
  const [value, setValue] = useState<string>('')
  const [position, setPosition] = useState<number | null>(null)
  const [prevPosition, setPrevPosition] = useState<number | null>(null)
  const [index, setIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      if (prevPosition + 1 < value.length) { // insertion in middle
        inputRef.current.selectionStart = index + 2
        inputRef.current.selectionEnd = index + 2
      } else { // insertion at end
        inputRef.current.selectionStart = prevPosition + 1
        inputRef.current.selectionEnd = prevPosition + 1
      }
    }
  }, [value])

  useEffect(() => {
    setPosition(inputRef.current.selectionStart + 1)

    if (txs.length !== 0)  {
      const lastTx = txs.slice(-1).pop()

      if (firstCharOrInsertionAtBeginning(lastTx)) {
        setValue(lastTx.value + value)

      } else if (insertionAtEnd(lastTx)) {
        const newValue = lastTx.value
        const backID = lastTx.back
        const index = txs.findIndex((tx: tx) => tx.id === backID)
        setPrevPosition(inputRef.current.selectionStart)
        setValue(value.slice(0) + newValue)
      } else { // insertion in middle
        const newValue = lastTx.value
        const backID = lastTx.back
        const index = txs.findIndex((tx: tx) => tx.id === backID)
        const frontID = lastTx.front

        const left = index === 0 ? value.slice(0, 1) : value.slice(0, index+1)
        const right = value.slice(index+1)
        console.log(left + "+" + newValue + "+" + right)
        setPrevPosition(index+2)
        setPosition(index+2)
        setIndex(index)
        setValue(left + newValue + right)
      }
    }
  }, [txs])

  function firstCharOrInsertionAtBeginning(lastTx: tx) {
    return lastTx && lastTx.back === null ? true : false
  }

  function insertionAtEnd(lastTx: tx) {
    return lastTx && lastTx.front === null ? true : false
  }

  function handleKeyUp(e: any) {
    const value = e.key
    if (
      value.length !== 1
      // && value !== "Backspace"
    ) {
      return
    }

    let back
    if (e.target.value.length !== 0 && position === e.target.value.length) { // insertion at end
      back = position
      const thing = txs[back - 1]
      back = thing.id
    } else if (position === 0) { // first character OR insertion at beginning
      back = null
    } else if (e.target.value.length !== 0 && position !== e.target.value.length){
      back = position
      const thing = txs[back - 1]
      back = thing.id
    } else {
      console.log('no one knows...')
    }

    let front
    if (e.target.value.length !== 0 && position === 0) { // insertion at beginning
      front = position
      const thing = txs[front] //idk if this works
      front = thing.id
    } else if (e.target.value.length === 0) { // first character
      front = null
    } else if (e.target.value.length !== 0 && position === e.target.value.length) { // insertion at end
      front = null
    } else { // deletion at end
      front = position
      const thing = txs[front] // idk if this works <- THIS DEF IS BROKEN
      front = thing.id
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

  function doSomething(e:any) {
    return
  }

  return (
    <div className={`w-3/5 text-sm sm:text-2xl sm:w-2/5`}>
      <div className={`border-4 ${color}`}>
        <div className={"font-mono text-xs text-zinc-400 p-4"}>{client}</div>
        <input
          ref={inputRef}
          onChange={(e) => doSomething(e)}
          onKeyUp={(e: any) => handleKeyUp(e)}
          onClick={(e) => handleCursorMove(e)}
          className={"w-full p-4 outline-none"}
          placeholder="say something"
          value={value}
        />
      </div>

    </div>
  )
}


