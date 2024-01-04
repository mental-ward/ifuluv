import { Assets } from "pixi.js"

export class AssetManager {
    private static resources = new Map<string, any>()

    static loadAll(srcs: Record<string, string>){
        const loads = Object.keys(srcs).map(async id => {
            Assets.add({ alias: id, src: srcs[id] })
            const resource = await Assets.load(id)
            return this.resources.set(id, resource)
        })
        return Promise.all(loads)
    }
    // should be casted to type..
    static get<T>(id: string): T {
        return this.resources.get(id)
    }
}