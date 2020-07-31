import { setAutoFreeze } from "immer"
import { createContext, useContext } from "react"
import { Updater } from "use-immer"
import { _provider } from "./components/_provider"
import { ArgProps, Init, SetCallback, SetStore, SetValue, UseStore } from "./_types"

type ReturnProps<T> = [
    React.FC,
    UseStore<T>,
    () => SetStore<T>
]

export type ICTX<T> = {
    [K in keyof T]?: {
        initState: T[K] & { init: T[K] }
        Context: React.Context<T[K]>
        SetContext: React.Context<SetStore<T>>
        state?: [
            T[K] & { init: T[K] },
            (f?: (d: T[K] & { init: T[K] }) => void) => void
        ]
    }
}


export const useDSC = <T extends Init>(INITSTATE: T, ARGS?: ArgProps): ReturnProps<T> => {

    if (ARGS) {
        ARGS.disableAutoFreeze && setAutoFreeze(false)
    }

    const CTX: ICTX<T> = Object.entries(INITSTATE).reduce((prev, [key, init]) => ({
        ...prev,
        [key]: {
            initState: init,
            // initState: { [key]: init, init },
            Context: createContext(init),
            SetContext: createContext(null)
        }
    }), {})

    const ContextProvider = _provider(CTX)


    const useStore: UseStore<T> = <K extends keyof T>(key: K) => {
        const value = useContext(CTX[key].Context)
        return value
    }

    const setStore = (): SetStore<T> =>
        Object.entries(CTX).reduce((prev, [key, { SetContext }]) => {

            type K = typeof key

            const produce: Updater<T[K]> = useContext(SetContext)
            const newProduce = (cb: SetCallback<T, K> | SetValue<T, K>) => {

                if (typeof cb === "function") {
                    cb(draft)
                }
                else {
                    console.log(cb)
                }
            }

            return {
                ...prev,
                [key]: newProduce
                // [key]: useContext(SetContext)
            }
        }, {} as SetStore<T>)

    return [
        ContextProvider,
        useStore,
        setStore,
    ]

}