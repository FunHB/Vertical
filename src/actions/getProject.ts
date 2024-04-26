'use server'

import { IImage } from '../types/image'
import { Project } from '../types/project'
import { transformProject } from '../utils/transform'
import { cmsRequest } from './cmsRequest'

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

