import { AnimatedSprite, Spritesheet, Ticker } from "pixi.js"
import { Bodies, Body, Engine } from "matter-js"
import { boundMethod } from "autobind-decorator"


type EntityInitOptions<K extends PropertyKey> = {
    simulated: boolean
    spritesheet: Spritesheet
    animationData: AnimationData<K>
}
export type AnimationData<K extends PropertyKey> = {
    [animation in K]: {
        texture: string // animation texture key of sprite sheet
        speed: number // animation speed
    }
}
export class Entity<K extends PropertyKey> extends AnimatedSprite implements Engine.Live {

    private rigidBody: Body | null
    private animationData: AnimationData<K>
    private spritesheet: Spritesheet

    constructor(options: EntityInitOptions<K>){
        const sheetAnimations = options.spritesheet.animations
        // TODO: or use enum's first key
        super(sheetAnimations["idle"] ?? sheetAnimations[Object.keys(sheetAnimations)[0]])

        this.animationData = options.animationData
        this.spritesheet = options.spritesheet
        this.rigidBody = options.simulated ? Bodies.rectangle(
            this.x, this.y, this.width, this.height
        ) : null

        Ticker.shared.add(this.update)
    }
    @boundMethod
    update(time: number){
        if(this.rigidBody != null){
            const body = this.rigidBody!
            this.rotation = body.angle
            this.x = body.position.x
            this.y = body.position.y
        }
    }
    animate(animationKey: K){
        const animation = this.animationData[animationKey]
        this.stop()
        this.animationSpeed = animation.speed
        this.textures = this.spritesheet.animations[animation.texture]
        this.play()
    }

}