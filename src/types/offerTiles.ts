export interface OfferTile {
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