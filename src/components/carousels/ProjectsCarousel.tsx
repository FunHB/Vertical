'use client'

import 'react-multi-carousel/lib/styles.css'
import Carousel from "react-multi-carousel"
import Image from 'next/image'

interface BackgroundCarouselProps {
    images: { src: string, alt: string }[]
}

export default function BackgroundCarousel({ images }: BackgroundCarouselProps) {
    return (
        <Carousel
            additionalTransfrom={0}
            swipeable={true}
            draggable={true}
            minimumTouchDrag={80}
            showDots={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            arrows={false}
            centerMode={false}
            focusOnSelect={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            partialVisible={true}
            shouldResetAutoplay={true}
            sliderClass=""
            slidesToSlide={1}
            responsive={{
                desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 3,
                    partialVisibilityGutter: 50 // this is needed to tell the amount of px that should be visible.
                },
                tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 2,
                    partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
                },
                mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                    partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
                }
            }}
            itemClass="cursor-grab my-8 md:my-16 flex justify-center"
            containerClass=""
        >
            {images.map((image, index) => {
                const { src, alt } = image
                return (
                    <div key={index} className="relative aspect-square flex items-center pointer-events-none w-11/12">
                        <Image src={src} alt={alt} fill={true} sizes='(max-width: 764px) 90vw, 25vw' style={{ objectFit: 'contain' }} />
                    </div>
                )
            })}
        </Carousel>
    )
}