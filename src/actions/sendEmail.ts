'use server'

import { EmailTemplate } from '@/src/components/EmailTemplate'

export async function SendEmail(formData: FormData) {
    try {
        const rawFormData = {
            firstName: formData.get('firstname') as string ?? '',
            lastName: formData.get('lastname') as string ?? '',
            phoneNumber: formData.get('phone-number') as string ?? '',
            email: formData.get('email') as string ?? '',
            area: formData.get('area') as string ?? '',
            message: formData.get('message') as string ?? '',
            files: formData.get('files') as File ?? null,
        }

        console.log(rawFormData)

    } catch (exception) {
        console.error(exception)
    }
}