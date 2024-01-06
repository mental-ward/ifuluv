import { Container, Sprite, Texture } from "pixi.js"
import { EndlessAmbient, EndlessAmbientInitOptions, WideDisplayObject } from "./EndlessAmbient"
import { boundMethod } from "autobind-decorator"
import { HorizontalDirection } from "../enums"

export class UnitaryEndlessAmbient extends EndlessAmbient {

    private remainingSpaceWidth: number
    constructor(options: EndlessAmbientInitOptions & { ambientTexture: Texture }){
        const ambient = options.ambientTexture
        super(options)

        const rowContainer = new Container()
        const rowContainer2 = new Container()


        this.remainingSpaceWidth = this.containerWidth % ambient.width
        const generationNumber = this.containerWidth / ambient.width + 1
        for(let i=0; i<generationNumber; i++){
            const newAmbient = new Sprite(ambient)
            const newAmbient2 = new Sprite(ambient)
            rowContainer.addChild(newAmbient)
            rowContainer2.addChild(newAmbient2)
            newAmbient.x = ambient.width * i
            newAmbient2.x = this.containerWidth + ambient.width * (i + 2) - this.remainingSpaceWidth
        }
        this.addAmbients(rowContainer)
        this.addAmbients(rowContainer2)
        this.initialize()
    }
    @boundMethod
    override onUpdated(){
        for(const ambient of this.ambients){
            if(ambient.x <= -ambient.width && this.lastDirection == HorizontalDirection.Left){
                ambient.x = 0
            }
            if(ambient.x >= this.containerWidth + ambient.width && this.lastDirection == HorizontalDirection.Right){
                ambient.x = 0
            }
        }
    }
}