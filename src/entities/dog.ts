import { AssetManager } from "@/lib/graphics/AssetManager";
import { Entity } from "@/lib/graphics/Entity";
import { Spritesheet } from "pixi.js";

enum PlayerAnimation {
    Idle,
    Run
}
export class Dog extends Entity<PlayerAnimation> {
constructor(){
    super({
        simulated: true, // 물리엔진 적용
        animationData: {
        [PlayerAnimation.Idle]: { texture: "idle", speed: 100 },
        [PlayerAnimation.Run]: { texture: "run", speed: 100 },
        },
        spritesheet: AssetManager.get<Spritesheet>("dog")
    })
}
}