'use client'

import { RefObject, useEffect } from 'react'

export const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
    useEffect(() => {
        const listener = (event: Event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref?.current || ref.current.contains(event.target as Node)) {
                return
            }
            handler()
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [handler, ref])
}