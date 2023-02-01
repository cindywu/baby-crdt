import React from 'react'

type tx = {
  id: string
  client: string
  value: string
  backID: string
  frontID: string
}

type TransactionsProps = {
  txs: tx[]
}

export default function Transactions({ txs } : TransactionsProps) {
  const txsReversed = txs.slice().reverse()

  return (
    <div className={"flex flex-col justify-center pt-20 mx-0 sm:mx-24"}>
      <div className={"text-xl p-2 sm:p-0"}>
        <div className={"font-mono text-xs text-zinc-400 pb-4"}>Transactions</div>
        <div className={"overflow-auto max-h-60 w-screen sm:w-full"}>
        {txsReversed && txsReversed.map((tx: any, i: any) => {
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

type TransactionProps = {
  tx: tx
  i: number
}

function Transaction({ tx, i }: TransactionProps) {
  console.log(tx)
  return (
    <div className={i%2 === 1 ? "grid grid-cols-5 text-xs p-4 " : "grid grid-cols-5 text-xs p-4 bg-zinc-200"}>
      <div className={"font-mono"}>{tx.id.slice(-6)}</div>
      <div>{tx.client}</div>
      <div>{tx.value}</div>
      <div>{tx.backID === null ? "null" : tx.backID.slice(-6)}</div>
      <div>{tx.frontID === null ? "null" : tx.frontID.slice(-6)}</div>
    </div>
  )
}
