'use client'

import { useWindowSize } from "@/src/hooks/useWindowSize"
import { Question } from "@/src/types/question"
import QuestionComponent from "./QuestionComponent"

interface FAQParams {
    questions: Question[]
}

export default function FAQ({ questions }: FAQParams) {
    const { width } = useWindowSize()

    const remapped: [Question, Question][] = questions.map((question, index, array) => {
        if (index % 2 == 0) {
            return [question, array[index + 1]] as const
        }
        return null
    }).filter(pair => !!pair) as [Question, Question][]

    return (
        // <div className="relative bg-faq bg-repeat-y" style={{ height: `calc(${questions.length / 2} * 100vh)`, backgroundSize: `${width}px auto` }}>
        <div className="relative" style={{ height: `calc(${questions.length} * 50vh)` }}>
            {remapped.map(([first, second], index) => {
                return (
                    <div key={index} className="relative flex flex-col">
                        <QuestionComponent question={first} index={first.id - 1} />
                        <QuestionComponent question={second} index={second.id - 1} />
                    </div>
                )
            })}
        </div>
    )
}
