'use client'

import Link from 'next/link'
import { Pricing } from '../types/Pricing'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

interface PricingComponentProps {
    pricing: Pricing
}

export default function PricingComponent({ pricing }: PricingComponentProps) {
    const { t: strings } = useTranslation('pricing')

    const { id, title, subtitle, price, description, backgroundImage } = pricing
    const { name, alternativeText, formats: { thumbnail, small, medium, large } } = backgroundImage

    const [showPrice, setShowPrice] = useState(false)

    return (
        <div id={`${id}`} className='group relative aspect-4/3 w-11/12 sm:w-5/6 lg:w-1/2 2xl:w-[45%] m-3 md:m-5 overflow-hidden'
            onClick={() => {
                setShowPrice(!showPrice)
            }}>
            <Image
                className={`absolute top-0 left-0 w-full h-full ${showPrice ? 'scale-125' : 'group-hover:scale-125'} transition-all duration-500 ease-in-out transform`}
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${large ?? medium ?? small ?? thumbnail}`}
                alt={alternativeText ?? name}
                fill={true}
                sizes='(max-width: 768px) 340px, 640px'
            />
            <div className={`absolute top-0 left-0 w-full h-full ${showPrice ? 'p-0' : 'p-10 md:p-16'} transition-all duration-500 ease-in-out transform`}>
                <div className={`h-full bg-white/80 text-black flex flex-col justify-between items-center`}>
                    <div className='w-full text-center'>
                        <h5 className='w-5/6 m-auto text-2xl md:text-5xl pt-3 md:pt-10 md:pb-5 uppercase'>{title}</h5>
                        {!showPrice && subtitle ? <p className='text-base md:text-xl'>{subtitle}</p> : null}
                        {showPrice ? <p className='whitespace-pre-line text-sm md:text-2xl text-left pl-2 md:pl-5'>{description}</p> : null}
                    </div>
                    {!showPrice ? (
                        <div className='w-full text-center py-5'>
                            <h6 className='font-bold text-base md:text-xl'>{strings('pricing-check')}</h6>
                            <p className='text-sm md:text-lg'>{strings('pricing-check-rest')}</p>
                        </div>
                    ) : (
                        <div className='w-full text-right py-3 md:py-10 pr-2 md:pr-5'>
                            <h6 className='font-bold text-lg md:text-5xl'>{price}</h6>
                            <p className='text-sm md:text-lg'>{strings('pricing-net')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}