import { Scene } from "@/lib/engine/Scene";
import { AssetManager } from "@/lib/graphics/AssetManager";
import { Bar } from "@/lib/graphics/components/Bar";
import { EndlessAmbient } from "@/lib/graphics/components/EndlessAmbient";
import { Layer } from "@/lib/graphics/components/Layer";
import { LayerContainer } from "@/lib/graphics/components/LayerContainer";
import { SpeechBalloon, dialogue } from "@/lib/graphics/components/SpeechBalloon";
import { UnitaryEndlessAmbient } from "@/lib/graphics/components/UnitaryEndlessAmbient";
import { Graphics, Sprite, Texture } from "pixi.js";

// TODO: remove
// test scene
export class TestScene extends Scene {
    preload(): void {
        
    }
    script(): void {

        const back1 = new Layer({ z: -1 })
        const back2 = new Layer({ z: -2 })
        const fore1 = new Layer({ z: 1, focusLessBlurLevel: 16 })

        const b = AssetManager.get<Texture>("buildings")
        const fb = AssetManager.get<Texture>("far-buildings")
        const fg = AssetManager.get<Texture>("fg1")

        const par1 = new UnitaryEndlessAmbient({ parallax: 10, width: 1200, ambientTexture: b })
        const par2 = new UnitaryEndlessAmbient({ parallax: 5,  width: 1200, ambientTexture: fb })
        const nfg = new UnitaryEndlessAmbient({ parallax: 3, width: 1200, ambientTexture: fg })

        back1.addChild(par1)
        back2.addChild(par2)
        fore1.addChild(nfg)

        this.addChild(
            new LayerContainer().setLayers(
                back1,
                back2,
                fore1
            )
        )
        /*
        const testBar = new Bar({
            max: 100,
            initial: 100,
            inner: new Graphics().beginFill("red").drawRect(0, 0, 100, 100).endFill(),
            background: new Graphics().beginFill("black").drawRect(0, 0, 100, 100).endFill()
        })
        this.addChild(testBar)

        setInterval(() => {
            testBar.addValue(-1)
        }, 200)*/

        const testB = new SpeechBalloon([
            dialogue("안녕하세요.", { before: 0.5, inter: 0.1 }),
            dialogue("제 소개를 하자면,", { before: 1.5, inter: 0.1 }),
            dialogue("저는 불빡이라고 합니다.", { before: 1.5, inter: 0.2 })
        ])

        testB.x = 200
        testB.y = 200

        this.addChild(testB)

        testB.speak()

        setInterval(() => {
            par1.moveLeft(1)
            par2.moveLeft(1)
            nfg.moveLeft(1)
        }, 0)
    }
    onExit(): void {
        
    }
}