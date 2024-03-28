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
                    <div className="relative ml-10">
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
                <div className='ml-24 mt-5 pr-5'>
                    <p className="text-justify text-base md:text-lg">{answer}</p>
                </div>

                <div className="relative ml-20 mt-12">
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

                <div>
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
            <article className="relative self-end flex flex-col items-end w-[120%] md:w-[1344px] h-[800px] text-white bg-faq-right bg-contain bg-no-repeat bg-right-top"
                style={{
                    top: width < 1024 ? 300 : -((width*(9/16))-1080)-100
                }}>
                <div className='z-10 w-[45%] md:w-1/3 mt-36 md:mt-64 mb-5 pr-5'>
                    <h4 className="pt-16 font-bold text-right text-xl md:text-3xl">{header}</h4>
                </div>
                <div className='z-10 w-5/6 md:w-1/2 pr-5 mt-5'>
                    <p className="text-justify text-base md:text-lg" style={{ direction: 'rtl' }}>{answer}</p>
                </div>
            </article>
        )
    }

    if (index % 4 == 2) {
        return (
            <article className="absolute flex flex-col hidden">
                <div className="flex items-center">
                    <div className="relative ml-10">
                        <div className={`m-auto index${index % 4 + 1}`}></div>
                        <h3 className={`absolute top-[50%] left-[25%] text-white text-4xl`}>{id}.</h3>
                    </div>
                    <div className=''>
                        <h4 className="pt-16 font-bold text-3xl">{header}</h4>
                    </div>
                </div>
                <div className='ml-10'>
                    <p className="text-lg">{answer}</p>
                </div>
            </article>
        )
    }

    if (index % 4 == 3) {
        return (
            <article className="absolute flex flex-col hidden">
                <div className="flex items-center">
                    <div className="relative ml-10">
                        <div className={`m-auto index${index % 4 + 1}`}></div>
                        <h3 className={`absolute top-[50%] left-[25%] text-white text-4xl`}>{id}.</h3>
                    </div>
                    <div className=''>
                        <h4 className="pt-16 font-bold text-3xl">{header}</h4>
                    </div>
                </div>
                <div className='ml-10'>
                    <p className="text-lg">{answer}</p>
                </div>
            </article>
        )
    }

    return null
}