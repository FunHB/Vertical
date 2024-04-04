import { IImage } from './image'

export interface Project {
    id: number
    title: string
    images: IImage[]
}