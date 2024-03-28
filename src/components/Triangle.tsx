'use client'

import { CSSProperties } from "react"

interface TriangleProps {
    color: string
    rotation: number
    size: {
        top?: number | string,
        right?: number | string,
        left?: number | string
    }
    className?: string
    style?: CSSProperties
}

export default function Triangle({ size, color, rotation, className, style }: TriangleProps) {
    const { top, right, left } = size

    return (
        <div className={`w-0 h-0 border-solid ${className}`} style={{
            borderTopWidth: top,
            borderRightWidth: right,
            borderLeftWidth: left,
            borderColor: `${color} transparent transparent transparent`,
            transform: `rotate(${rotation}deg)`,
            ...style
        }} >
        </div>
    )
}