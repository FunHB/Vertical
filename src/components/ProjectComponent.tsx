'use client'

import 'react-multi-carousel/lib/styles.css'
import Carousel from "react-multi-carousel"
import Image from 'next/image'
import { Project } from '../types/project'
import Link from 'next/link'
import { createRef, useState } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'

interface ProjectComponentProps {
    project: Project
}

export default function ProjectComponent({ project }: ProjectComponentProps) {
    const { id, title, images } = project

    const ClickOutsideRef = createRef<HTMLDivElement>()
    const [showFullscreen, setShowFullscreen] = useState(false)

    useClickOutside(ClickOutsideRef, () => {
        setShowFullscreen(false)
    })

    return (
        <div className="">
            <Link href={`/project/${id}`}><h4 className="text-2xl md:text-4xl pt-1 pb-5 text-center">{title}</h4></Link>
            { /* small carousel */}
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
                        items: 6,
                        partialVisibilityGutter: 50 // this is needed to tell the amount of px that should be visible.
                    },
                    tablet: {
                        breakpoint: { max: 1200, min: 464 },
                        items: 4,
                        partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
                    },
                    mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 2,
                        partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
                    }
                }}
                itemClass="cursor-grab flex justify-center"
                containerClass=""
            >
                {images.map((image, index) => {
                    return (
                        <div key={index} className='relative aspect-square flex items-center w-full'
                            onClick={() => {
                                setShowFullscreen(true)
                            }}>
                            <Image src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${image}`} alt={`${title}-${index}`} fill={true} sizes='(max-width: 764px) 90vw, 25vw' className='pointer-events-none object-contain' />
                        </div>
                    )
                })}
            </Carousel>

            { /* fullscreen carousel */}
            {showFullscreen ? (
                <div className='absolute w-screen h-screen top-0 left-0 flex flex-col justify-center items-center'>
                    <div className='w-full h-3/4 bg-black/70 flex flex-col justify-center items-center' ref={ClickOutsideRef}>
                        <Carousel
                            additionalTransfrom={0}
                            swipeable={true}
                            draggable={true}
                            minimumTouchDrag={80}
                            showDots={false}
                            infinite={true}
                            autoPlay={false}
                            keyBoardControl={true}
                            arrows={true}
                            centerMode={false}
                            focusOnSelect={false}
                            rewind={false}
                            rewindWithAnimation={false}
                            rtl={false}
                            sliderClass=""
                            slidesToSlide={1}
                            responsive={{
                                desktop: {
                                    breakpoint: { max: 3000, min: 0 },
                                    items: 1,
                                    partialVisibilityGutter: 50 // this is needed to tell the amount of px that should be visible.
                                }
                            }}
                            itemClass="cursor-grab flex justify-center"
                            containerClass="w-1/2"
                        >
                            {images.map((image, index) => {
                                return (
                                    <div key={index} className='relative aspect-square flex items-center w-full'>
                                        <Image src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${image}`} alt={`${title}-${index}`} fill={true} sizes='(max-width: 764px) 90vw, 25vw' className='pointer-events-none object-contain' />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </div>
                </div>
            ) : null}
        </div>
    )
}