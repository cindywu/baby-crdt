import React from 'react'

type TransactionsProps = {
  txs: any
}

export default function Transactions({ txs } : TransactionsProps) {
  return (
    <div className={"flex flex-col justify-center pt-20 mx-24"}>
      <div className={"w-full text-xl p-4 "}>
        <div className={"font-mono text-xs text-zinc-400 pb-4"}>Transactions</div>
        <div className={"overflow-auto max-h-48"}>
        {txs && txs.map((tx: any, i: any) => {
        return (
          <Transaction
            key={tx.id}
            tx={tx}
            i={i}
          />
        )
      })}
      </div>
      </div>
    </div>
  )
}

function Transaction({ tx, i} : any) {
  return (
    <div className={i%2 === 1 ? "grid grid-cols-5 text-xs p-4" : "grid grid-cols-5 text-xs p-4 bg-zinc-200"}>
      <div className={"font-mono"}>{tx.id.slice(-6)}</div>
      <div>{tx.client}</div>
      <div>{tx.value}</div>
      <div>{tx.back === null ? "null" : tx.back.slice(-6)}</div>
      <div>{tx.front === null ? "null" : tx.front.slice(-6)}</div>
    </div>
  )
}
