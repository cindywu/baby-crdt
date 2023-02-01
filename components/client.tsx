import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent
} from 'react'
import { nanoid } from 'nanoid'
import Document from './document'

type Tx = {
  id: string
  client: string
  value: string | null
  backID: string | null
  frontID: string | null
}

type ClientProps = {
  color: string
  txs: Tx[]
  setTxs: (txs: Tx[]) => void
  client: string
}

type Char = {
  id: string
  value: string
  frontID: string
  backID: string
  inHeaven: boolean
}

export default function Client({ color, txs, setTxs, client }: ClientProps) {
  const [document, setDocument] = useState<Char[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log({document})
  }, [document])

  useEffect(() => {
    const lastTx = txs.slice(-1)[0]

    if (lastTx) {
      const char = generateNewChar(lastTx.value, lastTx.backID, lastTx.frontID, false)
      setDocument([...document, char])
    }
  }, [txs])

  function processTx(e: KeyboardEvent<HTMLInputElement>){
    let value = e.key // "a"

    if (!isValidValue(value)) {
      console.log('baby-crdt does not know how to operate on ', value)
      return
    }

    const backID = getBackID()

    const tx = generateNewTx(value, client, backID, null)
    setTxs([...txs, tx])
  }

  function getBackID(){
    if (document.length > 0) {
      return document[0].id
    }
    return null
  }

  function generateNewChar(value, backID, frontID, inHeaven){
    const char = {
      id: nanoid(),
      value,
      backID,
      frontID,
      inHeaven
    }
    return char
  }

  function generateNewTx(value, client, backID, frontID){
    const tx = {
      id: nanoid(),
      value: value,
      client,
      backID,
      frontID
    }
    return tx
  }

  function isValidValue(value: string) {
    return value.length === 1 ? true : false
  }

  function getValueFromDocument(){
    return "hello"
  }


  return (
    <div className={`w-3/5 text-sm sm:text-2xl sm:w-2/5`}>
      <div className={`border-4 ${color}`}>
        <div className={"font-mono text-xs text-zinc-400 p-4"}>{client}</div>
        <input
          ref={inputRef}
          onChange={() => console.log('onChange fired!')}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => processTx(e)}
          // onClick={(e) => handleCursorMove(e)}
          className={"w-full p-4 outline-none"}
          placeholder="say something"
          // value={getValueFromDocument()}
        />
      </div>
      <Document
       document={document}
      />

    </div>
  )
}


