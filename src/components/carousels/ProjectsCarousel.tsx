'use client'

import 'react-multi-carousel/lib/styles.css'
import Carousel from "react-multi-carousel"
import Image from 'next/image'
import { ProjectMedia } from '@/src/types/projectMedia'
import Link from 'next/link'

interface ProjectsCarouselProps {
    images: ProjectMedia[]
}

export default function ProjectsCarousel({ images }: ProjectsCarouselProps) {
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
                wideDesktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 5,
                    partialVisibilityGutter: 50 // this is needed to tell the amount of px that should be visible.
                },
                desktop: {
                    breakpoint: { max: 1024, min: 778 },
                    items: 3,
                    partialVisibilityGutter: 50 // this is needed to tell the amount of px that should be visible.
                },
                tablet: {
                    breakpoint: { max: 778, min: 464 },
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
                const { projectId, src, alt } = image
                return (
                    <div key={index} className='relative aspect-square flex items-center w-11/12 select-none'>
                        <Image src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${src}`} alt={alt ?? projectId} fill={true} sizes='c' className='pointer-events-none object-contain' />
                    </div>
                )
            })}
        </Carousel>
    ) : null
}