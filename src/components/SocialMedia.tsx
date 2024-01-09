'use client'

import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram"
import { faPinterest } from "@fortawesome/free-brands-svg-icons/faPinterest"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SocialMediaProps {
    horizontal?: boolean
}

export default function SocialMedia({ horizontal = true }: SocialMediaProps) {
    return (
        <div>
            <ul className={`flex ${horizontal ? 'flex-row' : 'flex-col'} items-center justify-center space-x-2`}>
                <li><a href="#"><FontAwesomeIcon size="2x" icon={faFacebook} /></a></li>
                <li><a href="#"><FontAwesomeIcon size="2x" icon={faInstagram} /></a></li>
                <li><a href="#"><FontAwesomeIcon size="2x" icon={faPinterest} /></a></li>
            </ul>
        </div>
    )
}
