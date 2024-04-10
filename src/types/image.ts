export interface IImage {
    name: string
    caption: string
    alternativeText: string
    formats: {
        thumbnail?: string,
        small?: string,
        medium?: string,
        large?: string,
        huge?: string
    }
}