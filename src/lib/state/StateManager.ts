import { Viewport } from "pixi-viewport"
import { Engine } from "../engine/Engine"
import { Scene } from "../engine/Scene"

export type StateTable = {
    mainEngine: Engine | null
    mainCamera: Viewport | null
    currentScene: Scene | null
}
export class StateManager {
    static table: StateTable = {
        mainEngine: null,
        mainCamera: null,
        currentScene: null
    }
    static get<K extends keyof StateTable>(key: K){
        return StateManager.table[key]
    }
    static set<K extends keyof StateTable>(newStates:Record<K, StateTable[K]>){
        let key: K
        for(key in newStates){
            StateManager.table[key] = newStates[key]
        }
    }
}
