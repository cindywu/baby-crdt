import React from 'react'

type Char = {
  id: string | null
  value: string | null
  frontID: string | null
  backID: string | null
  inHeaven: boolean
}

type DocumentProps = {
  document: Char[]
}

export default function Document({ document } : DocumentProps) {

  return (
    <div className={"pt-4"}>
      {document && document.map((char: Char, i: number)=> {
        return (
          <Char
            key={char.id}
            char={char}
            i={i}
          />
        )
      })}
    </div>
  )
}


function Char({char, i}: {char: Char, i: number}){
  return(
    <div className={
      i%2 === 1
        ?
        "grid grid-cols-5 text-xs p-1"
        :
        "grid grid-cols-5 text-xs bg-zinc-200 p-1"
    }>
      <div className={"font-mono"}>{char ? char.id?.slice(-3) : "null"}</div>
      <div className={""}>{char.backID ? char.backID.slice(-3) : "null"}</div>
      <div className={""}>{char.frontID ? char.frontID.slice(-3) : "null"}</div>
      <div className={""}>{char.value}</div>
      <div className={""}>{char.inHeaven && "😇"}</div>
    </div>
  )
}

