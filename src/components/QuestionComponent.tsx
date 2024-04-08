'use client'

import { useWindowSize } from "../hooks/useWindowSize"
import { Question } from "../types/question"
import Triangle from "./Triangle"

interface QuestionComponentProps {
    question: Question
    index: number
}

export default function QuestionComponent({ question, index }: QuestionComponentProps) {
    const { id, header, answer } = question

    const windowSize = useWindowSize()

    const width = windowSize.width ?? 1920

    if (index % 4 == 0) {
        return (
            <article className="absolute flex flex-col w-full lg:w-[1024px]">
                <div className="flex items-center">
                    <div className="relative ml-0 md:ml-10">
                        <Triangle
                            color={"#000000"}
                            rotation={-120}
                            size={{
                                top: 130,
                                right: 60,
                                left: 60
                            }}
                        />
                        <h3 className={`absolute top-[50%] left-[20%] text-white text-4xl`}>{id}.</h3>
                    </div>
                    <div className='pr-5'>
                        <h4 className="pt-10 font-bold text-xl md:text-3xl">{header}</h4>
                    </div>
                </div>
                <div className='ml-5 md:ml-24 mt-5 pr-5'>
                    <p className="text-justify text-base md:text-lg">{answer}</p>
                </div>

                <div className="hidden md:block relative ml-20 mt-12">
                    <Triangle className="absolute mt-10"
                        color={"#000000"}
                        rotation={-50}
                        size={{
                            top: 45,
                            right: 20,
                            left: 20
                        }}
                    />
                    <Triangle className="absolute ml-10"
                        color={"#000000"}
                        rotation={45}
                        size={{
                            top: 60,
                            right: 30,
                            left: 30
                        }}
                    />
                    <Triangle className="absolute ml-[3.9rem] mt-8"
                        color={"#fff"}
                        rotation={-55}
                        size={{
                            top: 58,
                            right: 29,
                            left: 29
                        }}
                    />
                    <Triangle className="absolute ml-16 mt-8"
                        color={"#000000"}
                        rotation={-55}
                        size={{
                            top: 55,
                            right: 27,
                            left: 27
                        }}
                    />
                </div>

                <div className="hidden md:block">
                    <Triangle className="absolute -left-10 mt-40"
                        color={"#000000"}
                        rotation={180 - 25}
                        size={{
                            top: 100,
                            right: 45,
                            left: 45
                        }}
                    />
                </div>
            </article>
        )
    }

    if (index % 4 == 1) {
        return (
            <article className="self-end flex flex-col items-end w-[770px] md:w-[1344px] h-[800px] text-white bg-faq-right bg-contain bg-no-repeat bg-right-top"
                style={{
                    marginTop: width < 768 ? 400 : width < 1024 ? 300 : width > 1920 ? -100 :  -((width * (9 / 16)) - 1080) - 100
                }}>
                <div className='z-10 w-[35%] md:w-[28%] min-h-24 md:min-h-28 mt-52 md:mt-80 md:mb-5 pr-5'>
                    <h4 className="font-bold text-right text-xl md:text-3xl">{header}</h4>
                </div>
                <div className='z-10 w-screen md:w-1/2 pl-5 pr-5 mt-5'>
                    <p className="text-justify text-base md:text-lg" style={{ direction: 'rtl' }}>{answer}</p>
                </div>
            </article>
        )
    }

    if (index % 4 == 2) {
        return (
            <article className="absolute flex flex-col items-start w-[800px] md:w-[1344px] h-[800px] -mt-32 md:mt-0 text-white bg-faq-left bg-contain bg-no-repeat bg-left-top">
                <div className="md:hidden">
                    <Triangle className="absolute mt-96"
                        color={"#000"}
                        rotation={0}
                        size={{
                            top: 200,
                            right: 200,
                            left: 0
                        }} />
                </div>

                <div>
                    <h3 className={`absolute top-24 md:top-32 left-10 md:left-12 text-black text-4xl`}>{id}.</h3>
                </div>
                <div className='z-10 w-[31%] md:w-1/2 min-h-24 md:min-h-28 mt-20 md:mt-32 ml-28 md:ml-32 mb-5 pr-5'>
                    <h4 className="font-bold text-xl md:text-3xl">{header}</h4>
                </div>
                <div className='z-10 w-screen md:w-[40%] pr-5 pl-5 md:pl-10'>
                    <p className="text-justify text-base md:text-lg">{answer}</p>
                </div>
            </article>
        )
    }

    if (index % 4 == 3) {
        return (
            <article className="self-end flex flex-col items-end w-full lg:w-[1024px] mt-32">
                <div className="relative w-1/4 mb-20" style={{
                    marginTop: width < 768 ? 300 : width < 1024 ? 500 : width > 1920 ? 0 : -((width * (9 / 16)) - 1080)
                }}>
                    <Triangle className="absolute ml-16"
                        color={"#000000"}
                        rotation={180 - 50}
                        size={{
                            top: 45,
                            right: 20,
                            left: 20
                        }}
                    />
                    <Triangle className="absolute ml-5 mt-5"
                        color={"#000000"}
                        rotation={180 + 45}
                        size={{
                            top: 60,
                            right: 30,
                            left: 30
                        }}
                    />
                    <Triangle className="absolute mt-[0.1rem]"
                        color={"#fff"}
                        rotation={180 - 55}
                        size={{
                            top: 53,
                            right: 26,
                            left: 26
                        }}
                    />
                    <Triangle className="absolute ml-[0.1rem]"
                        color={"#000000"}
                        rotation={180 - 55}
                        size={{
                            top: 52.5,
                            right: 25,
                            left: 25
                        }}
                    />
                </div>

                <div className='w-screen md:w-5/6 lg:w-2/3 px-5 md:pr-10'>
                    <h4 className="pt-10 font-bold text-right text-xl md:text-3xl">{header}</h4>
                </div>
                <div className='w-screen md:w-5/6 mt-5 px-5 md:pr-10'>
                    <p className="text-justify text-base md:text-lg">{answer}</p>
                </div>

                <div className="hidden md:block mb-32 xl:mb-96">
                    <Triangle className="absolute right-16 mt-5"
                        color={"#000000"}
                        rotation={-25}
                        size={{
                            top: 100,
                            right: 45,
                            left: 45
                        }}
                    />
                </div>
            </article>
        )
    }

    return null
}