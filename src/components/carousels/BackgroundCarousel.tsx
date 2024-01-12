'use client'

import 'react-multi-carousel/lib/styles.css'
import Carousel from "react-multi-carousel"
import { Background1, Background2, Background2b, Background3, Background4, Background5, Background6, Background7 } from "@/src/assets/img/home/background"
import Image from 'next/image'

interface BackgroundCarouselProps {
}

export default function BackgroundCarousel({ }: BackgroundCarouselProps) {
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
    )
}