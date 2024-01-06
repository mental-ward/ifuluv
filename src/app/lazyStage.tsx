'use client'

import { Engine } from "@/lib/engine/Engine"
import { Scene } from "@/lib/engine/Scene"
import { AssetManager } from "@/lib/graphics/AssetManager"
import { MainScene } from "@/scenes/main"
import { FC, useEffect, useRef } from "react"
import { assets } from "./assets"
import { TestScene } from "@/scenes/test"

const scenes = {
  main: new MainScene(),
  test: new TestScene()
}
const LazyStage = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  let alreadyInitialized = false

  useEffect(() => {
    if(!alreadyInitialized){
        const engine = new Engine({
            graphics: {
                view: ref.current!,
                backgroundColor: "white",
                width: window.innerWidth,
                height: window.innerHeight,
            },
            physics: {
                plugin: {}
            }
        })
        engine.init()
        ref.current!.width = window.innerWidth
        ref.current!.height = window.innerHeight
      
        AssetManager.loadAll(assets).then(() => {
            Scene.change(scenes.test)
        })
        alreadyInitialized = true
    }
  }, [])

  return (
    <canvas ref={ref} />
  )
}
export default LazyStage