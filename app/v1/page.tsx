"use client"
import React, { useState } from 'react'
import Client from '../../components/v1/client'
import Transactions from '../../components/v1/transactions'

export default function Home() {
  const [txs, setTxs] = useState([])

  return (
    <div className={"w-screen"}>
      <div className={"flex justify-center py-10 text-2xl font-bold"}>baby crdt v1</div>
      <div className={"flex flex-row justify-center space-x-14"}>
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
    </div>
  )
}