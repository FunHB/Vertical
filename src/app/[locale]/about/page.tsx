import { getImage } from "@/src/actions/getImage"
import initTranslations from "@/src/app/i18n"
import Header from "@/src/components/Header"
import Triangle from "@/src/components/Triangle"
import { Metadata } from "next"
import Image from 'next/image'

const i18nNamespaces: string[] = ['about']

interface AboutParams {
    params: {
        locale: string
    }
}

export async function generateMetadata({ params: { locale } }: AboutParams): Promise<Metadata> {
    const { t: metadata } = await initTranslations(locale, ['metadata'])

    return {
        title: metadata('about-title')
    }
}

export default async function About({ params: { locale } }: AboutParams) {
    const { t: strings } = await initTranslations(locale, i18nNamespaces)

    const image = await getImage('about')

    const { alternativeText, formats: { thumbnail, small, medium, large } } = image ?? { formats: {} }

    return (
        <>
            <Header locale={locale} />
            <main className="">
                <section className="text-black bg-white pt-28">
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
                                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${large ?? medium ?? small ?? thumbnail}`}
                                        alt={alternativeText ?? ''}
                                        fill={true}
                                        sizes="(max-width: 764px) 83.33%, (max-width: 1024px) 66.66%, 50%"
                                    />
                                </div>
                            </div>

                            <div className="absolute w-5/6 md:w-3/4 lg:w-1/2 -bottom-10 lg:-bottom-5 right-0">
                                <p className="whitespace-pre text-right text-base mr-12">{strings('about-image-caption')}</p>
                            </div>
                        </div>
                    ) : null}

                    <div className="relative mt-16 pb-16 lg:pb-28 w-11/12 md:w-5/6 m-auto">
                        <h4 className="text-center text-2xl mb-8 z-10">{strings('about-text-header')}</h4>
                        <div className="whitespace-pre-wrap w-5/6 md:w-3/4 m-auto text-justify text-xl z-10">
                            {strings('about-text')}
                        </div>
                        <div className="absolute top-0 h-full w-full flex flex-col justify-between px-0 lg:px-10 xl:px-24">
                            <div className="w-full h-1/2 flex justify-end">
                                <div className="w-1/6 lg:w-[12%] xl:w-1/12 bg-about-right-corner bg-no-repeat bg-right-top bg-contain"></div>
                            </div>
                            <div className="w-full h-1/2 flex justify-start">
                                <div className="w-1/6 lg:w-[15%] xl:w-[10%] bg-about-left-corner bg-no-repeat bg-left-bottom bg-contain"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
