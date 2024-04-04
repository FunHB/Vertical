'use server'

import { Project } from '../types/project'
import { cmsRequest } from './cmsRequest'
import { transformProject } from './getProject'

export const getProjects = async (language: string): Promise<Project[]> => {
    try {
        const response = await cmsRequest(`projects`, 'GET', {
            'populate': 'images',
            'locale': language
        })

        const project: Project[] = response.data.map((data: any) => {
            return transformProject(data)
        })

        return project
    } catch (exception) {
        console.error(exception)
        return []
    }
}