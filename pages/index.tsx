import React, { useState } from 'react'
import Client from '../components/client'
import Transactions from '../components/transactions'
import Link from 'next/link'

type Tx = {
  id: string
  client: string
  value: string
  back: string
  front: string
}

export default function Home() {
  const [txs, setTxs] = useState<Tx[]>([])

  return (
    <div className={"w-screen"}>
      <div className={"flex justify-center pt-10 pb-5 text-2xl font-bold"}>baby crdt</div>
      <div className={"flex justify-center pb-5 font-mono text-xs text-zinc-400"}><Link href="https://github.com/cindywu/baby-crdt">github.com/cindywu/baby-crdt</Link></div>
      <div className={"flex flex-row justify-center space-x-2 pl-2 sm:pl-0 sm:space-x-14"}>
        <Client
          color={"border-lime-400"}
          txs={txs}
          setTxs={setTxs}
          client={"Client A"}
        />
        <Client
          color={"border-amber-400"}
          txs={txs}
          setTxs={setTxs}
          client={"Client B"}
        />
      </div>
      <Transactions
        txs={txs}
      />
      <div className={"fixed bottom-0 font-mono text-xs text-zinc-400 w-screen text-center py-8 bg-white"}>
      <Link href="https://cindy-wu.com">cindy-wu.com</Link>
      </div>
    </div>
  )
}
