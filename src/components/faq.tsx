import { Question } from "@/src/types/question"
import QuestionComponent from "./QuestionComponent"

interface FAQParams {
    questions: Question[]
}

export default function FAQ({ questions }: FAQParams) {
    const remapped: [Question, Question][] = questions.map((question, index, array) => {
        if (index % 2 == 0) {
            return [question, array[index + 1]] as const
        }
        return null
    }).filter(pair => !!pair) as [Question, Question][]

    return (
        // <div className="relative bg-faq bg-repeat-y" style={{ height: `calc(${questions.length / 2} * 100vh)`, backgroundSize: `${width}px auto` }}>
        <div className="relative">
            {remapped.map(([first, second], index) => {
                return (
                    <div key={index} className="relative flex flex-col min-h-96">
                        {first ? <QuestionComponent question={first} index={index * 2} /> : null}
                        {second ? <QuestionComponent question={second} index={index * 2 + 1} /> : null}
                    </div>
                )
            })}
        </div>
    )
}
