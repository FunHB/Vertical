'use client'

import { SocialMediaType } from "@/src/types/SocialMediaType"
import { faFacebook, faInstagram, faLinkedin, faPinterest, faReddit, faSnapchat, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faNotdef } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { SocialMedia } from '../types/socialMedia'
import { getSocialMedia } from "@/src/actions/getSocialMedia"
import { SizeProp } from "@fortawesome/fontawesome-svg-core"

interface SocialMediaProps {
    vertical?: boolean
    size?: SizeProp
}

export default function SocialMedia({ vertical = false, size = '2x' }: SocialMediaProps) {
    const queryClient = useQueryClient()

    const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([])

    useEffect(() => {
        queryClient.fetchQuery({
            queryKey: ['socialmedia'],
            queryFn: () => {
                return getSocialMedia()
            }
        }).then(data => {
            setSocialMedia(data)
        })
    }, [queryClient])

    return socialMedia ? (
        <div>
            <ul className={`flex ${vertical ? 'flex-col space-y-1' : 'flex-row space-x-2'} items-center justify-center`}>
                {socialMedia.map((site, index) => {
                    return (
                        <li key={index}><a href={site.link}><FontAwesomeIcon size={size} icon={getIconByType(site.type)} /></a></li>
                    )
                })}
            </ul>
        </div>
    ) : null
}

const getIconByType = (type: SocialMediaType) => {
    if (type === SocialMediaType.Facebook) {
        return faFacebook
    }

    if (type === SocialMediaType.Instagram) {
        return faInstagram
    }

    if (type === SocialMediaType.LinkedIn) {
        return faLinkedin
    }

    if (type === SocialMediaType.Pinterest) {
        return faPinterest
    }

    if (type === SocialMediaType.Reddit) {
        return faReddit
    }

    if (type === SocialMediaType.Snapchat) {
        return faSnapchat
    }

    if (type === SocialMediaType.TikTok) {
        return faTiktok
    }

    if (type === SocialMediaType.Twitter) {
        return faTwitter
    }

    if (type === SocialMediaType.YouTube) {
        return faYoutube
    }

    return faNotdef
}