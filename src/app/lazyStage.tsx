'use client'

import { Engine } from "@/lib/engine/Engine"
import { Scene } from "@/lib/engine/Scene"
import { AssetManager } from "@/lib/graphics/AssetManager"
import { MainScene } from "@/scenes/main"
import { FC, useEffect, useRef } from "react"
import { assets } from "./assets"

const scenes = {
  main: new MainScene()
}
const LazyStage = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  let alreadyInitialized = false

  useEffect(() => {
    if(!alreadyInitialized){
        const engine = new Engine({
            graphics: {
                view: ref.current!,
                backgroundColor: "white"
            },
            physics: {
                plugin: {}
            }
        })
        engine.init()
        ref.current!.width = window.innerWidth
        ref.current!.height = window.innerHeight
      
        AssetManager.loadAll(assets).then(() => {
            Scene.change(scenes.main)
        })
        alreadyInitialized = true
    }
  }, [])

  return (
    <canvas ref={ref} />
  )
}
export default LazyStage