export interface Offer {
    id: number
    title: string
    shortDescription: string
    icon: {
        formats: {
            thumbnail: string,
            image: string
        }
    }
}