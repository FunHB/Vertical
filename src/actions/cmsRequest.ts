'use server'

import { RequestMethodType } from "@/src/types/requestMethodType"

export const cmsRequest = async (path: string, method: RequestMethodType, queryParams?: Record<string, string>) => {
    const response = await fetch(`${process.env.API_URL}/${path}?${new URLSearchParams(queryParams).toString()}`, {
        method: method,
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${process.env.API_TOKEN ?? ''}`
        }
    })

    if (!/(2\d\d)|(304)/.test(`${response.status}`)) {
        const { error: { status, name, message }} = await response.json()
        throw new Error(`${status} ${name}: ${message}`)
    }

    return response.json()
}