import { getImages } from "@/src/actions/getImages"
import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import Triangle from "@/src/components/Triangle"
import { Metadata } from "next"
import Image from 'next/image'
import { jsonLd } from "../layout"

const i18nNamespaces: string[] = ['about']

interface AboutParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: AboutParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        alternates: {
            canonical: `/${locale}/about`,
            languages: {
                'en-US': '/en/about',
                'pl-PL': '/pl/about'
            }
        },
        title: metadata('about-title'),
        description: metadata('about-description'),
        openGraph: {
            title: metadata('about-title'),
            description: metadata('about-description')
        }
    }
}

export default async function About({ params: { locale } }: AboutParams) {
    const { t: strings } = await initTranslations(locale, i18nNamespaces)
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    const image = (await getImages('about'))[0]

    const { name, alternativeText, formats: { thumbnail, small, medium, large, huge } } = image ?? { formats: {} }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd(
                        '/about/',
                        metadata('about-title'),
                        metadata('about-description'),
                        locale,
                        new Date('2024-04-22T17:38:48.063Z'),
                        new Date()
                    ))
                }}
            />
            <Header locale={locale} />
            <main className="">
                <section className="text-black bg-white pt-28 overflow-hidden">
                    <h2 className="text-4xl md:text-5xl pt-5 mb-16 text-center">{strings('about-header')}</h2>

                    {image ? (
                        <div className="relative w-5/6 md:w-2/3 lg:w-1/2 m-auto">
                            <div className="relative p-3 md:p-5 lg:p-7">
                                <Triangle className="absolute top-0 right-0"
                                    color={"#000000"}
                                    rotation={0}
                                    size={{
                                        top: 'calc(50vw * 1/4)',
                                        right: 0,
                                        left: 'calc(50vw * 1/4)',
                                    }}
                                />

                                <Triangle className="absolute bottom-0 left-0 "
                                    color={"#000000"}
                                    rotation={180}
                                    size={{
                                        top: 'calc(50vw * 1/4)',
                                        right: 0,
                                        left: 'calc(50vw * 1/4)',
                                    }}
                                />

                                <div className="relative aspect-video">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${huge ?? large ?? medium ?? small ?? thumbnail}`}
                                        alt={alternativeText ?? name ?? 'about'}
                                        fill={true}
                                        sizes="(max-width: 764px) 83.33%, (max-width: 1024px) 66.66%, 50%"
                                    />
                                </div>
                            </div>

                            <div className="absolute w-5/6 md:w-3/4 lg:w-1/2 -bottom-10 lg:-bottom-5 right-0">
                                <p className="whitespace-pre-line text-right text-base mr-5 md:mr-12">{strings('about-image-caption')}</p>
                            </div>
                        </div>
                    ) : null}

                    <div className="relative mt-16 pb-16 lg:pb-28 w-11/12 md:w-3/4 m-auto">
                        <div className="absolute -right-5 top-0 sm:right-0 aspect-square w-16">
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
                        <h4 className="text-center text-2xl mb-8">{strings('about-text-header')}</h4>
                        <div className="whitespace-pre-wrap w-11/12 m-auto text-justify text-base sm:text-xl mb-16 lg:mb-12">
                            {strings('about-text')}
                        </div>

                        <div className="absolute -left-5 sm:left-0 bottom-0 aspect-square w-16 mb-24">
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
        </>
    )
}
