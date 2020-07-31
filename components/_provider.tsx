import produce, { castDraft, castImmutable, Draft } from 'immer'
import { useState } from 'react'
// import { useImmer } from 'use-immer'
import { ICTX } from '..'
import { Init } from '../_types'

type Dispatch<State> = (dispatch: (draft: Draft<State>) => void | State) => void
type ImmerStore<State> = [State, Dispatch<State>]

export function useImmer<S = any>(initialValue: S): ImmerStore<S> {
    const [state, updateState] = useState<S>(initialValue)
    const dispatch = (updater: (draft: Draft<S>) => void) => {
        const newState = produce(updater)(castImmutable(castDraft(state))) as S
        updateState(newState)
        // return newState
    }

    return [state, dispatch]
}

export const _provider = <T extends Init>(CTX: ICTX<T>) => ({ children }) => {

    const Context = Object.values(CTX).reduceRight((prev, VAL) => {

        const { Context, SetContext, initState } = VAL
        const [store, set] = useImmer(initState)

        return (
            <Context.Provider value={store}>
                <SetContext.Provider value={set}>
                    {prev}
                </SetContext.Provider>
            </Context.Provider>
        )

    }, children)

    return Context

}