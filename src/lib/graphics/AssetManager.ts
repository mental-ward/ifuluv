import { Assets } from "pixi.js"
import { ImageResolver, SpritesheetResolver } from "../util/asset"

export class AssetManager {
    private static resources = new Map<string, any>()

    static loadAll(resolvers: Array<SpritesheetResolver | ImageResolver>){
        const loads = resolvers.map(async resolver => {
            Assets.add(resolver)
            const resource = await Assets.load(resolver.alias)
            return this.resources.set(resolver.alias, resource)
        })
        return Promise.all(loads)
    }
    // should be casted to type..
    static get<T>(id: string): T {
        return this.resources.get(id)
    }
}