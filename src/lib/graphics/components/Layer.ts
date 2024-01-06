import { BlurFilter, Container } from "pixi.js";

type LayerInitOptions = {
    z: number
    focusLessBlurLevel?: number
}
export class Layer extends Container {
    constructor(options: LayerInitOptions){
        super()
        this.zIndex = options.z
        this.sortableChildren = true
        if(options.focusLessBlurLevel != undefined){
            this.filters = [
                new BlurFilter(options.focusLessBlurLevel, 16)
            ]
        }
    }
}