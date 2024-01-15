import LanguageChanger from "./LanguageChanger"
import Navbar from "./Navbar"
import SocialMedia from "./SocialMedia"
import Logo from "./Logo"

interface HeaderProps {
    white?: boolean
}

export default function Header({ white = false }: HeaderProps) {
    return (
        <header className={`flex flex-row items-start w-full p-3 z-20 fixed text-white bg-black/90 md:absolute ${white ? '' : 'md:text-black'} md:top-0 md:bg-black/0`}>
            <Logo color={white ? 'white' : 'black'} className={`w-16 h-44 mb-2 hidden md:block`} />
            <div className="flex-1 flex flex-row justify-between items-center">
                <SocialMedia />
                <div className="flex flex-row-reverse md:flex-row items-center">
                    <Navbar />
                    <LanguageChanger />
                </div>
            </div>
        </header>
    )
}
