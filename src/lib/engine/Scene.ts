import { Container } from "pixi.js"
import { StateManager } from "../state/StateManager"

export abstract class Scene extends Container {
    abstract preload(): void
    abstract script(): void
    abstract onExit(): void

    static change(scene: Scene){
        const currentScene = StateManager.get("currentScene")
        const mainEngine = StateManager.get("mainEngine")
        currentScene?.onExit()
        currentScene?.destroy()
        StateManager.set({
            currentScene: scene
        })
        scene.preload()
        mainEngine?.add(scene)
        scene.script()
    }
}