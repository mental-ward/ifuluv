

export class SpritesheetResolver {
    constructor(
        public alias: string,
        public src: string,
        public data: { imageFilename: string }
    ){}
}
export class ImageResolver {
    constructor(
        public alias: string,
        public src: string
    ){}
}

export const spritesheet = (alias: string, fileName: string) => {
    const [src, ext] = fileName.split(".")
    return new SpritesheetResolver(
        alias,
        src + ".json",
        { imageFilename: alias + ".png" }
    )
}
export const image = (alias: string, fileName: string) => {
    let fileSrc = fileName
    if(/\~(png|jpg)/.test(fileName)){
        const [, ext] = fileName.split("~")
        fileSrc = alias + `.${ext}`
    }
    return new ImageResolver(
        alias,
        fileSrc
    )
}