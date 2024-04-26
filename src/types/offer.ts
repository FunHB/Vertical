import { IImage } from './image'
import { Project } from './project'

export interface Offer {
    id: number
    title: string
    shortDescription: string
    longDescription: string
    icon: IImage
    projects: Project[]
    locale: string
    index: number
    createdAt: Date
    updatedAt: Date
    localizations?: Offer[]
}