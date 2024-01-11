export interface OfferTile {
    id: number
    title: string
    description: string
    link: string
    icon: {
        formats: {
            thumbnail: string,
            small: string
        }
    }
}