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
      {document && document.map((char: Char)=> {
        return (
          <Char
            key={char.id}
            char={char}
          />
        )
      })}
    </div>
  )
}

function Char({char}: {char: Char}){
  return(
    <div className={"px-2 flex justify-between"}>
      <div className={"font-mono text-xs"}>{char.id.slice(-6)}</div>
      <div>{char.value}</div>
    </div>
  )
}

