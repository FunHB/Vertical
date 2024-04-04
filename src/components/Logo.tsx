'use client'

import LogoSvg from '../assets/img/logo.svg'

interface LogoProps {
    className?: string
    color?: string
}

export default function Logo({ className, color = 'white' }: LogoProps) {
    return (
        <div className={`${className}`}>
            <LogoSvg fill={color} className={`font-logo fill-${color}`} />
        </div>
    )
}