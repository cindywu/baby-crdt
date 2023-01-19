import React from 'react'

type TransactionsProps = {
  txs: any
}

export default function Transactions({ txs } : TransactionsProps) {
  // console.log('txs', txs)
  return (
    <div className={"flex flex-col justify-center pt-20 mx-24"}>
      <div className={"w-full border-4 border-zinc-400 text-xl p-4 "}>
        <div className={"font-mono text-xs text-zinc-400"}>Transactions</div>
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
  )
}

function Transaction({ tx, i} : any) {
  return (
    <div className={i%2 === 1 ? "flex flex-row justify-between text-xs p-4" : "flex flex-row justify-between text-xs p-4 bg-zinc-200"}>
      <div className={"font-mono"}>{tx.id.slice(-6)}</div>
      <div>{tx.client}</div>
      <div>{tx.value}</div>
    </div>
  )
}
