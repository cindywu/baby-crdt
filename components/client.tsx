import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

type ClientProps = {
  color: string
  txs: any
  setTxs: any
  client: string
}

export default function Client({ color, txs, setTxs, client } : ClientProps) {
  console.log({txs})
  const [value, setValue] = useState('')

  useEffect(() => {
    txs.length !== 0 && setValue(txs[txs.length - 1].value)
  }, [txs])

  function handleChange(e : any){
    console.log({e})
    const tx = {
      id: nanoid(),
      client,
      value: e.target.value
    }
    console.log({tx})
    setTxs([...txs, tx])
  }
  return (
    <div className={`w-2/5 text-2xl`}>
      <div className={`border-4 ${color}`}>
        <div className={"font-mono text-xs text-zinc-400 p-4"}>{client}</div>
        <input
          onChange={(e) => handleChange(e)}
          className={"w-full p-4 outline-none"}
          placeholder="say something"
          value={value}
        />
      </div>

    </div>
  )
}
