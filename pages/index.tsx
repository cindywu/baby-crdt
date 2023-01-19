import React from 'react'
import Client from '../components/client'
import Transactions from '../components/transactions'

export default function Home() {
  return (
    <div>
      hi, i am a baby crdt. welcome to my web presence.
      <Client/>
      <Client/>
      <Transactions/>
    </div>
  )
}
