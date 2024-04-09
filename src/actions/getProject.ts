'use server'

import { IImage } from '../types/image'
import { Project } from '../types/project'
import { cmsRequest } from './cmsRequest'
import { transformImage } from './getImage'

export const getProject = async (projectId: number, language: string): Promise<Project | null> => {
    try {
        const response = await cmsRequest(`projects/${projectId}`, 'GET', {
            'populate': 'images',
            'locale': language
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

    const transformedImages: IImage[] = images?.data ? images?.data.map(({ id, attributes }: any) => {
        return transformImage({ id, ...attributes })
    }) : []

    return {
        id,
        title,
        images: transformedImages
    }
}