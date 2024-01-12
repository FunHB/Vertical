'use server'

import { Project } from '../types/project'
import { cmsRequest } from './cmsRequest'

export const getProjects = async (projectId: number, language: string) => {
    try {
        const response = await cmsRequest(`projects/${projectId}`, 'GET', {
            'populate': 'images',
            '_locale': language
        })

        const project: Project = transformProject(response)

        return project
    } catch (exception) {
        console.error(exception)
        return []
    }
}

export const transformProject = (project: any): Project => {
    const { id, attributes: { title, images } } = project

    const imagesStrings: string[] = images.map((image: any) => {
        const { data: { attributes: { formats: { small, medium, large } } } } = image
        return (large ?? medium ?? small).url
    })

    
    return {
        id,
        title,
        images: imagesStrings
    }
}