import { useRef } from "react";

export function useTimeoutPromise(fn: Function, delay: number) {
    let timer=useRef<NodeJS.Timeout>();
    function handler(...params: any) {
        return new Promise((resolve, reject) => {
            timer.current = setTimeout(async () => {
                try {
                    const response = await fn(...params)
                    resolve(response)
                }
                catch (e) {
                    reject(e)
                }
            }, delay * 1000)

        })
    }
    function clear() {
        clearTimeout(timer.current)
    }
    return [handler, clear]
}
export function useInterval(fn: Function, delay: number) {
    let interval = useRef<NodeJS.Timeout>();
    const handler = (...params: any) => {
        interval.current = setInterval(() => {
            fn(...params)
        }, delay * 1000)
    }
    const clear = () => {
        clearInterval(interval.current)
    }
    return [handler, clear]
}