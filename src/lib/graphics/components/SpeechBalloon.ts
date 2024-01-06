import { Container, Sprite, Text, Texture } from "pixi.js"
import { AssetManager } from "../AssetManager"
import { wait } from "@/lib/util/logic"

// delay in seconds
export const dialogue = (text: string, timings: { before: number, inter: number }) => ({ ...timings, text })

export class SpeechBalloon extends Container {
    private left: Sprite
    private right: Sprite
    private middle: Sprite
    private tail: Sprite
    private currentFullDialogue: Text
    constructor(private dialogSeq: Array<ReturnType<typeof dialogue>>){
        super()

        this.left = new Sprite(AssetManager.get<Texture>("sp-balloon-left"))
        this.right = new Sprite(AssetManager.get<Texture>("sp-balloon-right"))
        this.middle = new Sprite(AssetManager.get<Texture>("sp-balloon-middle"))
        this.tail = new Sprite(AssetManager.get<Texture>("sp-balloon-tail"))
        this.currentFullDialogue = new Text("", {
            fontSize: 15,
            fill: 0x00000000,
            align: "center",
            
        })
        this.currentFullDialogue.resolution = 2
        this.tail.scale.set(0.2)
        this.middle.scale.set(0.35, 0.2)
        this.right.scale.set(0.35, 0.2)
        this.left.scale.set(0.35, 0.2)

        this.middle.width = 40

        this.middle.x = this.left.x + this.left.width / 2

        this.updateVariantPositions()

        this.currentFullDialogue.x = this.middle.x
        this.currentFullDialogue.y += this.middle.height / 2 - this.currentFullDialogue.height / 2

        this.addChild(this.left, this.middle, this.right, this.currentFullDialogue, this.tail)
    }
    private updateVariantPositions(){
        this.right.x = this.middle.x + this.middle.width - this.right.width / 2
        this.tail.x = this.left.x + this.left.width / 2
        this.tail.y = this.middle.y + this.middle.height - this.tail.height / 2 + 5
    }
    async speak(){
        for(const dialogue of this.dialogSeq){
            const { before, inter, text } = dialogue
            await wait(before * 1000)
            for(const char of text.split("")){
                await wait(inter * 1000)
                this.currentFullDialogue.text += char
                if(this.middle.width < (this.currentFullDialogue.text.length + 2) * 13){
                    this.middle.width += 13
                }
                this.updateVariantPositions()
                this.currentFullDialogue.x = this.middle.x + 13
            }
        }
    }
}