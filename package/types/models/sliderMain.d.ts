export interface ISliderMain {
    _id: string
    createdAt: Date
    type: "img" | "video"
    url: string
    title: string
    tags: string[]
    sourse?: {
        url: string
        buttonName: string
    }
}