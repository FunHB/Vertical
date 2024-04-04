'use client'

import Link from 'next/link'
import { Pricing } from '../types/Pricing'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface PricingComponentProps {
    pricing: Pricing
}

export default function PricingComponent({ pricing }: PricingComponentProps) {
    const { t } = useTranslation('pricing')

    const { id, title, subtitle, price, backgroundImage } = pricing
    const { alternativeText, formats: { thumbnail, small, medium, large } } = backgroundImage

    return (
        <Link id={`${id}`} className='relative aspect-4/3 w-11/12 sm:w-5/6 lg:w-1/2 2xl:w-1/3 m-3 md:m-10' href={`/pricing/${id}`}>
            <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${large ?? medium ?? small ?? thumbnail}`}
                alt={alternativeText ?? ''}
                fill={true}
                sizes='(max-width: 768px) 340px, 640px'
            />
            <div className='absolute top-0 left-0 w-full h-full p-10 md:p-16'>
                <div className='h-full bg-white/80 text-black flex flex-col justify-between items-center'>
                    <div className='w-full text-center'>
                        <h5 className='w-5/6 m-auto text-2xl md:text-5xl pt-3 md:pt-10 md:pb-5 uppercase'>{title}</h5>
                        {subtitle ? <p className='text-base md:text-xl'>{subtitle}</p> : null}
                    </div>
                    <div className='w-full text-center py-5'>
                        <h6 className='font-bold text-base md:text-xl'>{t('pricing-check')}</h6>
                        <p className='text-sm md:text-lg'>{t('pricing-check-rest')}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}