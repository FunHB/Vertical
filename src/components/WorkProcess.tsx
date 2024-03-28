'use client'

import { Process1, Process10, Process2, Process3, Process4, Process5, Process6, Process7, Process8, Process9 } from "@/src/assets/img/home/process"
import ProcessTile from "./ProcessTile"
import { useTranslation } from "react-i18next"

interface WorkProcessProps {
}

export default function WorkProcess({ }: WorkProcessProps) {
    const { t: processStrings } = useTranslation('process')

    const processTiles = [
        { src: Process1, alt: 'point-1', caption: processStrings('point-1') },
        { src: Process2, alt: 'point-2', caption: processStrings('point-2') },
        { src: Process3, alt: 'point-3', caption: processStrings('point-3') },
        { src: Process4, alt: 'point-4', caption: processStrings('point-4') },
        { src: Process5, alt: 'point-5', caption: processStrings('point-5') },
        { src: Process6, alt: 'point-6', caption: processStrings('point-6') },
        { src: Process7, alt: 'point-7', caption: processStrings('point-7') },
        { src: Process8, alt: 'point-8', caption: processStrings('point-8') },
        { src: Process9, alt: 'point-9', caption: processStrings('point-9') },
        { src: Process10, alt: 'point-10', caption: processStrings('point-10') },
    ]

    return (
        <div className="relative flex flex-row justify-center flex-wrap mb-8" >
            {
                processTiles.map((tile, index) => {
                    return (
                        <ProcessTile key={index} index={index} tile={tile} />
                    )
                })
            }
        </div>
    )
}