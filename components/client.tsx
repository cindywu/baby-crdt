import React from 'react'

type ClientProps = {
  color: string
}

export default function Client({ color } : ClientProps) {
  return (
    <div className={`w-2/5 text-2xl`}>
      <div className={`border-4 ${color}`}>
        <div className={"font-mono text-xs text-zinc-400 p-4"}>Client</div>
        <input
          className={"w-full p-4 outline-none"}
          placeholder="say something"
        />
      </div>

    </div>
  )
}
