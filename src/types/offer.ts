import { Project } from './project'

export interface Offer {
    id: number
    title: string
    shortDescription: string
    longDescription: string
    icon: {
        formats: {
            thumbnail: string,
            image: string
        }
    },
    projects: Project[]
}