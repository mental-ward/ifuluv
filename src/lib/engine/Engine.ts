import { boundMethod } from "autobind-decorator"
import Matter from "matter-js"
import { Viewport } from "pixi-viewport"
import * as Pixi from "pixi.js"
import { Entity } from "../graphics/Entity"
import { StateManager } from "../state/StateManager"

export class Engine {
    private graphics: Pixi.Application
    private physics: Matter.Engine

    private physicsWorker: Matter.Runner
    private camera: Viewport
    //private entities = new Map<Symbol, Engine.Live>()

    constructor(options?: {
        graphics: Partial<Pixi.IApplicationOptions>,
        physics: Matter.IEngineDefinition
    }){
        this.graphics = new Pixi.Application(options ? options.graphics : undefined)
        this.physics = Matter.Engine.create(options ? options.physics : undefined)
        this.physicsWorker = Matter.Runner.create()
        this.camera = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            
            events: this.graphics.renderer.events
        })
    }

    init(){
        StateManager.set({
            mainEngine: this,
            mainCamera: this.camera
        })
        this.graphics.stage.addChild(this.camera)
        Matter.Runner.run(this.physicsWorker, this.physics)
        this.graphics.ticker.add(this.update)
        console.log(this.graphics.stage.children)
    }
    add(target: Pixi.Container | Pixi.AnimatedSprite | Pixi.Sprite | Entity<any>){
        this.camera.addChild(target)
    }
    @boundMethod
    private update(time: number){
        // what to do
    }

    get view(){
        return this.graphics.view
    }
}