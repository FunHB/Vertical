'use server'

import { cmsRequest } from './cmsRequest'
import { ProjectMedia } from '../types/projectMedia'

export const getHomeProjects = async (): Promise<ProjectMedia[]> => {
    try {
        const response = await cmsRequest('upload/files', 'GET', {
            'filters[caption][$containsi]': 'home'
        })

        const media: ProjectMedia[] = response.map((data: any) => {
            const { caption, alternativeText, formats: { small, medium } } = data
            return { projectId: +caption.split('-')[1], src: (medium ?? small).url, alt: alternativeText }
        })

        return media
    } catch (exception) {
        console.error(exception)
        return []
    }
}