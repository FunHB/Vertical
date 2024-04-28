import initTranslations from "@/src/app/i18n"
import ContactForm from "@/src/components/ContactForm"
import Header from "@/src/components/Header"
import Triangle from "@/src/components/Triangle"
import TranslationsProvider from "@/src/providers/TranslationsProvider"
import { Metadata } from "next"
import { jsonLd } from "../layout"

const i18nNamespaces: string[] = ['contact']

interface ContactParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: ContactParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        alternates: {
            canonical: `/${locale}/contact`,
            languages: {
                'en-US': '/en/contact',
                'pl-PL': '/pl/contact'
            }
        },
        title: metadata('contact-title'),
        description: metadata('contact-description'),
        openGraph: {
            title: metadata('contact-title'),
            description: metadata('contact-description')
        }
    }
}

export default async function Contact({ params: { locale } }: ContactParams) {
    const { t: strings, resources } = await initTranslations(locale, i18nNamespaces)
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd(
                        '/contact/',
                        metadata('contact-title'),
                        metadata('contact-description'),
                        locale,
                        new Date('2024-04-22T17:38:48.063Z'),
                        new Date()
                    ))
                }}
            />
            <Header locale={locale} />
            <TranslationsProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
                <main>
                    <section className="text-black bg-white pt-28 pb-16 overflow-hidden">
                        <div className="relative w-11/12 md:w-2/3 lg:w-1/2 m-auto">
                            <div className="absolute right-0 top-0 aspect-square w-16">
                                <Triangle
                                    className="absolute left-0"
                                    color={"#000"}
                                    rotation={0}
                                    size={{
                                        top: 50,
                                        right: 25,
                                        left: 25
                                    }}
                                />
                                <Triangle
                                    className="absolute -right-6 -bottom-5"
                                    color={"#000"}
                                    rotation={-100}
                                    size={{
                                        top: 45,
                                        right: 20,
                                        left: 20
                                    }}
                                />
                            </div>

                            <h2 className="text-4xl md:text-5xl pt-5 text-center">{strings('contact-header')}</h2>
                            <h4 className="w-5/6 m-auto text-xl md:text-3xl pt-1 pb-10 text-center">{strings('contact-subtitle')}</h4>

                            <ContactForm />

                            <div className="absolute left=0 bottom-0 aspect-square w-16">
                                <Triangle
                                    className="absolute top-0 -left-5"
                                    color={"#000"}
                                    rotation={75}
                                    size={{
                                        top: 35,
                                        right: 15,
                                        left: 15
                                    }}
                                />
                                <Triangle
                                    className="absolute top-12 -left-5"
                                    color={"#000"}
                                    rotation={30}
                                    size={{
                                        top: 42,
                                        right: 18,
                                        left: 18
                                    }}
                                />
                                <Triangle
                                    className="absolute top-8 right-0"
                                    color={"#000"}
                                    rotation={140}
                                    size={{
                                        top: 48,
                                        right: 23,
                                        left: 23
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </TranslationsProvider>
        </>
    )
}