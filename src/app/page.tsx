'use client'

import dynamic from "next/dynamic"

const Stage = dynamic(() => import("./lazyStage"), { ssr: false })
export default function Home() {
  return (
    <Stage />
  )
}
