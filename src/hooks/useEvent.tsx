import { useEffect } from 'react';

const useEvent = (hex: any, eventName: string, callback: (data: any) => void) => {
    
    useEffect(() => {
        hex && hex.subscribe(eventName, (data: any) => {
            callback(data)
        })
    })
}

export default useEvent