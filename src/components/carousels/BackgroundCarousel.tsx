'use client'

import 'react-multi-carousel/lib/styles.css'
import Carousel from "react-multi-carousel"
import { Background1, Background2, Background2b, Background3, Background4, Background5, Background6, Background7 } from "@/src/assets/img/home/background"
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'

interface BackgroundCarouselProps {
}

export default function BackgroundCarousel({ }: BackgroundCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    const images = [
        { src: Background1, alt: '1' },
        { src: Background2, alt: '2' },
        { src: Background2b, alt: '2b' },
        { src: Background3, alt: '3' },
        { src: Background4, alt: '4' },
        { src: Background5, alt: '5' },
        { src: Background6, alt: '6' },
        { src: Background7, alt: '7' }
    ]

    return (
        <section ref={scrollRef} className="h-screen relative bg-black/0">
            <Carousel className="h-full w-full"
                additionalTransfrom={0}
                swipeable={false}
                draggable={false}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                keyBoardControl={false}
                arrows={false}
                centerMode={false}
                focusOnSelect={false}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                partialVisible={false}
                shouldResetAutoplay={false}
                slidesToSlide={1}
                responsive={{
                    desktop: {
                        breakpoint: { max: 3000, min: 0 },
                        items: 1
                    }
                }}
            >
                {images.map((image, index) => {
                    const { src, alt } = image
                    return (
                        <div key={index} className="relative h-screen w-screen">
                            <Image src={src} alt={alt} fill={true} className="object-cover" />
                        </div>
                    )
                })}
            </Carousel>
            <div className="absolute top-0 left-0 bg-black/70 z-10 w-full h-full">
                <div className="flex flex-col items-center justify-start h-full">
                    <div className="flex flex-col justify-end h-2/3 md:h-3/4 items-center md:items-end text-white">
                        <h1 className="underline underline-offset-4 uppercase text-7xl decoration-4 md:text-[10rem] md:decoration-8">Vertical</h1>
                        <div className="flex flex-col items-center text-lg mt-3 md:text-2xl md:mt-10">
                            <p>&quot;Make Yourself all simplicity&quot;</p>
                            <p>~ Marcus Aurelius</p>
                        </div>
                    </div>
                    <button className="flex-1 flex items-center animate-bounce-slow"
                        type="button"
                        onClick={() => {
                            const height = scrollRef.current?.clientHeight ?? 0
                            window.scrollBy(0, (height - window.scrollY) / 2)
                        }}>
                        <FontAwesomeIcon className="w-10 h-10 md:w-14 md:h-14" icon={faChevronDown} />
                    </button>
                </div>
            </div>
        </section>
    )
}