'use client'

import Image from "next/image"
import LogoSvg from '../assets/img/logo.svg'

interface LogoProps {
    className?: string
    color?: string
}

export default function Logo({ className, color = 'white' }: LogoProps) {
    return (
        <div className={`relative ${className}`}>
            <LogoSvg fill={color} className={`font-logo fill-${color}`} />
        </div>
    )
}