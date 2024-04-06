'use client'

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { SendEmail } from "../actions/sendEmail"

interface ContactFormProps {
}

export default function ContactForm({ }: ContactFormProps) {
    const { t: strings } = useTranslation('contact')

    const [submitted, setSubmitted] = useState(false)

    const form = [
        { name: 'firstname', type: 'text' },
        { name: 'lastname', type: 'text' },
        { name: 'phone-number', type: 'tel' },
        { name: 'email', type: 'email' },
        { name: 'city', type: 'text' },
        {
            name: 'area', type: 'radio', options: [
                strings('under-20'),
                strings('20-50'),
                strings('50-150'),
                strings('150-200'),
                strings('above-200')
            ]
        },
        { name: 'message', type: 'textarea' },
        { name: 'files', type: 'file' }
    ]

    return !submitted ? (
        <form className="" action={SendEmail} onSubmit={() => {
            setSubmitted(true)
            
        }}>
            <div className="w-full h-full py-5">
                {form.map((input, index) => {
                    const { name, type, options } = input
                    return (
                        <div key={index} className="w-5/6 m-auto my-4">
                            {['file', 'radio'].includes(type) ? (<label className="inline-block text-xl px-2 py-1">{`${strings(name)}${type !== 'file' ? '*' : ''}`}</label>) : null}

                            <div className="flex items-center border-b border-black :border-black py-2 rounded-sm">
                                {getInputByType(name, type, strings(name), options)}
                            </div>
                        </div>
                    )
                })}
                <div className="w-5/6 m-auto mb-3">
                    <p className="text-sm">* {strings('required')}</p>
                </div>
                <div className="w-full flex flex-row items-center justify-center">
                    <button type="submit" className="text-white border border-black font-bold text-xl px-10 py-3 rounded-md bg-black hover:bg-white hover:text-black">
                        {strings('submit-button')}
                    </button>
                </div>
                <div className="w-5/6 m-auto py-5 md:py-10">
                    <p className="text-base">
                        {strings('rodo')}
                    </p>
                </div>
            </div>
        </form>
    ) : (
        <div className="w-full h-full py-12 pb-24 mb-2">
            <h3 className="text-xl md:text-3xl text-center ">{strings('form-submitted')}</h3>
        </div>
    )
}

const getInputByType = (name: string, type: string, placeholder: string, options?: string[]) => {
    const className = 'appearance-none bg-transparent border-none w-full text-lg py-1 px-2 leading-tight text-black placeholder:text-black focus:outline-none invalid:text-rose-600'

    if (type === 'file') {
        return (
            <input className={`${className}`}
                accept="image/*, application/pdf"
                required={false}
                name={name}
                type={type}
                aria-label={placeholder}
                multiple={true} />
        )
    }

    if (type === 'textarea') {
        return (
            <textarea className={`${className}`}
                required={true}
                name={name}
                rows={6}
                placeholder={`${placeholder}*`}
                aria-label={placeholder}>
            </textarea>
        )
    }

    if (type === 'radio' && options && options.length > 0) {
        return (
            <ul className={`items-center ${className}`}>
                {options.map((option, index) => {
                    return (
                        <li key={index} className="w-full h-full border-r border-white has-[:checked]:bg-black">
                            <label className="cursor-pointer flex items-center space-x-4 w-full p-3 ms-2 text-base text-black has-[:checked]:bg-white">
                                <input type="radio" value={option} name={name} required={true} className="hidden" defaultChecked={index == 0} />
                                {option}
                            </label>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <input className={`${className}`}
            required={true}
            name={name}
            type={type}
            placeholder={`${placeholder}*`}
            aria-label={placeholder} />
    )
}