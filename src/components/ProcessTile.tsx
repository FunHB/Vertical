'use client'

import 'react-multi-carousel/lib/styles.css'
import Carousel from "react-multi-carousel"
import Image from 'next/image'

interface BackgroundCarouselProps {
    index: number,
    tile: { src: any, alt: string, caption: string }
}

export default function BackgroundCarousel({ index, tile: { src, alt, caption } }: BackgroundCarouselProps) {
    return (
        <div className="flex-auto flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-5">
            <div className="relative flex flex-col items-center w-full">
                <div className="absolute flex items-center w-full h-full">
                    <hr className="w-full h-1 bg-black" />
                </div>
                <div className="z-10 p-4 bg-white">
                    <div className="relative h-32 w-32 sm:h-44 sm:w-44">
                        <Image src={src} alt={alt} fill={true} sizes="(max-width: 764px) 8rem, 11rem" className="object-cover rounded-full" />
                        <div className="absolute flex justify-center items-center text-5xl rounded-full w-full h-full bg-black/40 text-white">
                            {index + 1}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-2xl text-center w-40 sm:w-50">
                {caption}
            </div>
        </div>
    )
}