'use client'

import 'react-multi-carousel/lib/styles.css'
import Carousel from "react-multi-carousel"
import Image from 'next/image'
import { useWindowSize } from '@/src/hooks/useWindowSize'
import { IImage } from '@/src/types/image'

interface ProjectsCarouselProps {
    images: IImage[]
}

export default function ProjectsCarousel({ images }: ProjectsCarouselProps) {
    const { width } = useWindowSize()

    return images && images.length > 0 ? (
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
            centerMode={(width ?? 0) > 768}
            partialVisbile={(width ?? 0) < 768}
            focusOnSelect={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay={false}
            sliderClass=""
            slidesToSlide={1}
            responsive={{
                desktop: {
                    breakpoint: { max: 3000, min: 768 },
                    items: 3,
                    partialVisibilityGutter: 50 // this is needed to tell the amount of px that should be visible.
                },
                tablet: {
                    breakpoint: { max: 768, min: 464 },
                    items: 2,
                    partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
                },
                mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                    partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
                }
            }}
            itemClass="group cursor-grab px-3 xl:px-5 py-8 sm:py-20 flex justify-center -z-10 hover:z-10 transition-all duration-300"
            containerClass=""
        >
            {images.map((image, index) => {
                const { name, alternativeText, formats: { thumbnail, small, medium, large, huge } } = image
                return (
                    <div key={index} className='relative w-full aspect-square flex items-center select-none'>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${huge ?? large ?? medium ?? small ?? thumbnail}`}
                            alt={alternativeText ?? name}
                            fill={true}
                            sizes='20rem'
                            className='pointer-events-none object-contain md:group-hover:scale-[135%] transition-all ease-in-out duration-300'
                        />
                    </div>
                )
            })}
        </Carousel>
    ) : null
}