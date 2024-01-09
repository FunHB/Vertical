'use client'

import SocialMedia from "./SocialMedia"

interface HeaderProps {

}

export default function Header({ }: HeaderProps) {
    return (
        <header className="w-full h-24 flex flex-row items-center justify-between p-4">
            <div>
                <SocialMedia />
            </div>
            <div>

            </div>
        </header>
    )
}
