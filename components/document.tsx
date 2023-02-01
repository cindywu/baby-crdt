import React from 'react'

type Char = {
  id: string
  value: string
  frontID: string
  backID: string
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
        "grid grid-cols-4 text-xs p-1"
        :
        "grid grid-cols-4 text-xs bg-zinc-200 p-1"
    }>
      <div className={"font-mono"}>{char.id.slice(-3)}</div>
      <div className={""}>{char.backID ? char.backID.slice(-3) : "null"}</div>
      <div className={""}>{char.frontID ? char.frontID.slice(-3) : "null"}</div>
      <div className={""}>{char.value}</div>
    </div>
  )
}

