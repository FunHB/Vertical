'use client'

import 'react-multi-carousel/lib/styles.css'
import Carousel, { ArrowProps } from "react-multi-carousel"
import Image from 'next/image'
import { Project } from '../types/project'
import { createRef, useEffect, useState } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { IImage } from '../types/image'
import { useWindowSize } from '../hooks/useWindowSize'

interface ProjectComponentProps {
    project: Project
}

export default function ProjectComponent({ project }: ProjectComponentProps) {
    const { id, title, images } = project

    const ClickOutsideRef = createRef<HTMLDivElement>()
    const [showFullscreen, setShowFullscreen] = useState(false)
    const [fullScreenImage, setfullScreenImage] = useState(0)
    const [rearrangedImages, setRearrangedImages] = useState<IImage[]>(images)

    const { width } = useWindowSize()

    useEffect(() => {
        const array = images.slice()
        let image = array[0]

        while (image != images[fullScreenImage]) {
            const shifted = array.shift()
            if (!shifted) return
            array.push(shifted)
            image = array[0]
        }

        setRearrangedImages(array)
    }, [fullScreenImage, images])

    useClickOutside(ClickOutsideRef, () => {
        setShowFullscreen(false)
    })

    return images.length > 0 ? (
        <div className="">
            <h4 className="text-2xl md:text-4xl pt-1 pb-5 text-center">{title}</h4>
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
                centerMode={(width ?? 1920) > 768}
                partialVisible={(width ?? 1920) < 768}
                focusOnSelect={false}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
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
                    const { name, alternativeText, formats: { thumbnail, small, medium, large } } = image
                    return (
                        <div key={index} data-id={index} className='relative aspect-square flex items-center w-full select-none'
                            onClick={(event) => {
                                setShowFullscreen(true)
                                setfullScreenImage(+((event.target as HTMLDivElement)?.dataset?.id ?? 0))
                            }}>
                            <Image className='pointer-events-none object-contain'
                                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${large ?? medium ?? small ?? thumbnail}`}
                                alt={alternativeText ?? name}
                                fill={true}
                                sizes='(max-width: 764px) 90vw, 25vw'
                            />
                        </div>
                    )
                })}
            </Carousel>

            { /* fullscreen carousel */}
            {showFullscreen ? (
                <div className='fixed w-full h-full top-0 left-0 flex flex-col justify-center items-center bg-black/70 py-32 z-50'>
                    <div className='aspect-square w-[90vw] sm:w-auto sm:h-[90vh] flex flex-col justify-center items-center overflow-hidden' ref={ClickOutsideRef}>
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
                                    partialVisibilityGutter: 0 // this is needed to tell the amount of px that should be visible.
                                }
                            }}
                            itemClass="cursor-grab aspect-square flex justify-center items-center select-none"
                            containerClass="relative w-full h-full overflow-hidden"
                            customLeftArrow={<LeftArrow />}
                            customRightArrow={<RightArrow />}
                        >
                            {rearrangedImages.map((image, index) => {
                                if (!image) return null

                                const { name, alternativeText, formats: { thumbnail, small, medium, large } } = image
                                return (
                                    <Image key={index} className='pointer-events-none object-contain'
                                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${large ?? medium ?? small ?? thumbnail}`}
                                        alt={alternativeText ?? name}
                                        fill={true}
                                        sizes='(max-width: 764px) 90vw, 25vw'
                                    />
                                )
                            })}
                        </Carousel>
                    </div>
                </div>
            ) : null}
        </div>
    ) : null
}

function RightArrow({ onClick }: ArrowProps) {
    return (
        <div className='group invisible md:visible absolute top-0 right-0 w-1/4 h-full px-3 cursor-pointer select-none'
            onClick={onClick}
        >
            <div className='hidden w-full h-full group-hover:flex justify-end items-center'>
                {/* <FontAwesomeIcon icon={faChevronRight} /> */}
            </div>
        </div>
    )
}

function LeftArrow({ onClick }: ArrowProps) {
    return (
        <div className='group invisible md:visible absolute top-0 left-0 w-1/4 h-full px-3 cursor-pointer select-none'
            onClick={onClick}
        >
            <div className='hidden w-full h-full group-hover:flex justify-start items-center'>
                {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
            </div>
        </div>
    )
}