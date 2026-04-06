import { useEffect } from "react"

export default function useSessionState(key, state, setState) {

    useEffect(() => {

        const saved = sessionStorage.getItem(key)

        if (!saved) return

        try {
            setState(JSON.parse(saved))
        } catch (err) {
            console.error("Failed to restore session state", err)
        }

    }, [key, setState])


    useEffect(() => {

        sessionStorage.setItem(
            key,
            JSON.stringify(state)
        )

    }, [key, state])
}