import { useImmer } from 'use-immer'
import { ICTX } from '..'
import { Init } from '../_types'

export const _provider = <T extends Init>(CTX: ICTX<T>) => ({ children }) => {

    const Context = Object.values(CTX).reduceRight((prev, VAL) => {

        const { Context, SetContext, initState } = VAL
        const [store, set] = useImmer(initState)

        return (
            <Context.Provider value={store[0]}>
                <SetContext.Provider value={set}>
                    {prev}
                </SetContext.Provider>
            </Context.Provider>
        )

    }, children)

    return Context

}