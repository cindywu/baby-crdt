import React from 'react'
import Client from '../components/client'
import Transactions from '../components/transactions'

export default function Home() {
  return (
    <div className={"w-screen"}>
      <div className={"flex justify-center py-10 text-2xl font-bold"}>baby crdt</div>
      <div className={"flex flex-row justify-center space-x-4"}>
        <Client
          color={"border-lime-400"}
        />
        <Client
          color={"border-amber-400"}
        />
      </div>
      <Transactions/>
    </div>
  )
}
