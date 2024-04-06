'use server'

import { SendMailOptions, createTransport } from 'nodemailer'
import EmailTemplate from '@/src/components/EmailTemplate'
import { render } from '@react-email/render'

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
})

export async function SendEmail(formData: FormData) {
    try {
        const data = {
            firstName: formData.get('firstname') as string ?? '',
            lastName: formData.get('lastname') as string ?? '',
            phoneNumber: formData.get('phone-number') as string ?? '',
            email: formData.get('email') as string ?? '',
            area: formData.get('area') as string ?? '',
            message: formData.get('message') as string ?? '',
            files: formData.getAll('files') as File[] ?? null
        }

        const emailHtml = render(<EmailTemplate data={data} />)

        const mailOptions: SendMailOptions = {
            from: `Vertical Website`,
            to: process.env.EMAIL,
            subject: `Email from ${data.firstName} via contact form`,
            html: emailHtml,
            attachments: await Promise.all(data.files.map(async file => {
                return {
                    filename: file.name,
                    content: Buffer.from(await file.arrayBuffer())
                }
            }))
        }

        await transporter.sendMail(mailOptions)
    } catch (exception) {
        console.error(exception)
    }
}