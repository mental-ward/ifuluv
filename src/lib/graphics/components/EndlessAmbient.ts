import { StateManager } from "@/lib/state/StateManager"
import { boundMethod } from "autobind-decorator"
import { Container, DisplayObject, Sprite, Ticker } from "pixi.js"
import { Entity } from "../Entity"
import { HorizontalDirection } from "../enums"


export type EndlessAmbientInitOptions = {
    parallax: number
    width: number
}
export type WideDisplayObject = DisplayObject & Graphics.Wide
export class EndlessAmbient extends Container {
    protected parallax: number
    protected static divider = 10
    protected ambients: Array<WideDisplayObject> = []
    protected containerWidth: number
    protected lastDirection: HorizontalDirection | null = null

    constructor(options: EndlessAmbientInitOptions){
        super()
        this.parallax = options.parallax
        this.containerWidth = options.width
    }
    initialize(){
        Ticker.shared.add(this.onUpdated)
    }
    @boundMethod
    protected onUpdated(){
        for(const ambient of this.ambients){
            if(ambient.x <= -ambient.width && this.lastDirection == HorizontalDirection.Left){
                ambient.x = this.containerWidth + ambient.width
            }
            if(ambient.x >= this.containerWidth + ambient.width && this.lastDirection == HorizontalDirection.Right){
                ambient.x = 0
            }
        }
    }
    addAmbients(...objects: Array<WideDisplayObject>){
        this.ambients = [...this.ambients, ...objects]
        this.addChild(...objects)
    }
    moveRight(amount: number){
        for(const ambient of this.ambients){
            ambient.x += amount * this.parallax / EndlessAmbient.divider
        }
        this.lastDirection = HorizontalDirection.Right
    }
    moveLeft(amount: number){
       for(const ambient of this.ambients){
            ambient.x -= amount * this.parallax / EndlessAmbient.divider
       }
       this.lastDirection = HorizontalDirection.Left
    }
}
