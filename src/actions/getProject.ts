'use server'

import { Project } from '../types/project'
import { cmsRequest } from './cmsRequest'

export const getProject = async (projectId: number, language: string): Promise<Project | null> => {
    try {
        const response = await cmsRequest(`projects/${projectId}`, 'GET', {
            'populate': 'images',
            '_locale': language
        })

        const project: Project = transformProject(response.data)

        return project
    } catch (exception) {
        console.error(exception)
        return null
    }
}

export const transformProject = (project: any): Project => {
    const { id, attributes: { title, images } } = project

    const imagesStrings: string[] = images?.data.map((image: any) => {
        const { attributes: { formats: { small, medium, large } } } = image
        return (large ?? medium ?? small).url
    })

    
    return {
        id,
        title,
        images: imagesStrings
    }
}