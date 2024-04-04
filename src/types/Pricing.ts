import { IImage } from './image'

export interface Pricing {
    id: number
    title: string
    subtitle?: string
    price: number
    backgroundImage: IImage
}