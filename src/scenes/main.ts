import { Dog } from "@/entities/dog"
import { Scene } from "@/lib/engine/Scene"

export class MainScene extends Scene {
    preload(): void {
        const dog = new Dog()
        this.addChild(dog)
    }
    script(): void {

    }
    onExit(): void {
        
    }
}