import { Container, Graphics, Sprite, Texture } from "pixi.js"


type BarInitOptions = {
    max: number
    initial: number
    background: Texture | Graphics
    inner: Texture | Graphics
}
export class Bar extends Container {
    private max: number
    private current: number

    private inner: Sprite | Graphics
    private background: Sprite | Graphics
    constructor(options: BarInitOptions){
        super()
        this.max = options.max
        this.current = options.initial
        this.background = this.createOrUse(options.background)
        this.inner = this.createOrUse(options.inner)

        this.addChild(this.background)
        this.addChild(this.inner)
    }
    private createOrUse(source: Texture | Graphics){
        if(source instanceof Graphics) return source
        return new Sprite(source)
    }
    private updateChildrenSize(){
        this.inner.scale.x = this.current / this.max
    }
    setValue(value: number){
        this.current = value
        this.updateChildrenSize()
    }
    addValue(value: number){
        this.current += value
        this.updateChildrenSize()
    }
}