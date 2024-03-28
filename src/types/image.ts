export interface IImage {
    caption: string
    alternativeText: string
    formats: {
        thumbnail: string,
        small?: string,
        medium?: string,
        large?: string,
    }
}