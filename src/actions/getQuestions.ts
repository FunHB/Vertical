'use server'

import { Question } from '../types/question'
import { cmsRequest } from './cmsRequest'

export const getQuestions = async (language: string): Promise<Question[]> => {
    try {
        const response = await cmsRequest('faqs', 'GET', {
            'locale': language
        })

        const questions: Question[] = response.data.map((data: any) => {
            return transformQuestion(data)
        })

        return questions.sort((a, b) => a.id - b.id)
    } catch (exception) {
        console.error(exception)
        return []
    }
}

export const transformQuestion = (question: any): Question => {
    const { attributes: { index, header, answer, adnotation } } = question

    return { id: index, header, answer, adnotation }
}