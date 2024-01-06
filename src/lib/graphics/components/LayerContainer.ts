import { Container } from "pixi.js"
import { Layer } from "./Layer"

export class LayerContainer extends Container {
    constructor(){
        super()
        this.sortableChildren = true
    }

    setLayers(...layers: Array<Layer>){
        for(const layer of layers){
            this.addChild(layer)
        }
        return this
    }
}