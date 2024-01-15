import { SendEmail } from "@/src/actions/sendEmail"
import initTranslations from "@/src/app/i18n"
import ContactForm from "@/src/components/ContactForm"
import Header from "@/src/components/Header"
import TranslationsProvider from "@/src/providers/TranslationsProvider"
import { Metadata } from "next"

interface ContactParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: ContactParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        title: metadata('contact-title')
    }
}

const i18nNamespaces: string[] = ['contact']

export default async function Contact({ params: { locale } }: ContactParams) {
    const { t: strings, resources } = await initTranslations(locale, i18nNamespaces)

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

    return (
        <TranslationsProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
            <Header />
            <main>
                <section className="text-black bg-white pt-28 pb-16">
                    <h2 className="text-4xl md:text-5xl pt-5 text-center">{strings('contact-header')}</h2>
                    <h4 className="text-2xl md:text-4xl pt-1 pb-10 text-center">{strings('contact-subtitle')}</h4>

                    <form className="w-11/12 m-auto bg-form bg-cover bg-center" action={SendEmail}>
                        <div className="bg-zinc-700/80 w-full h-full py-5">
                            {form.map((input, index) => {
                                const { name, type, options } = input
                                return (
                                    <div key={index} className="w-5/6 m-auto my-4">
                                        {['file', 'radio'].includes(type) ? (<label className="inline-block text-white text-xl px-2 py-1">{strings(name)}</label>) : null}

                                        <div className="flex items-center border-b border-gray-400 :border-white py-2 bg-black/50 rounded-sm">
                                            {getInputByType(name, type, strings(name), options)}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="w-full flex flex-row items-center justify-center">
                                <button className="text-white border border-white text-xl px-10 py-3 rounded-md bg-black/25 hover:bg-black/50"
                                    type="submit"
                                >
                                    {strings('submit-button')}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </TranslationsProvider>
    )
}

const getInputByType = (name: string, type: string, placeholder: string, options?: string[]) => {
    const className = 'appearance-none bg-transparent border-none w-full text-lg py-1 px-2 leading-tight text-white placeholder:text-white focus:outline-none'

    if (type === 'textarea') {
        return (
            <textarea className={`${className}`}
                required={true}
                name={name}
                rows={6}
                placeholder={placeholder}
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
                            <label className="cursor-pointer flex items-center space-x-4 w-full py-3 ms-2 text-base text-white has-[:checked]:bg-white has-[:checked]:text-black has-[:checked]:border-black">
                                <input type="radio" value={option} name={name} required={true} className="w-4 h-4 mx-2 text-white" />
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
            required={type !== 'file'}
            name={name}
            type={type}
            placeholder={placeholder}
            aria-label={placeholder}
            multiple={type === 'file'} />
    )
}