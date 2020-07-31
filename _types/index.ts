export type ArgProps = {
    disableAutoFreeze?: boolean
}

export type Init = { [k: string]: any }

export type SetCallback<T, K extends keyof T> = (draft: T[K], init: T[K]) => T[K]
// export type SetCallback<T, K extends keyof T> = (f?: (draft: T[K], init: T[K]) => void) => void
export type SetValue<T, K extends keyof T> = T[K]
export type SetStore<T> = {
    [K in keyof T]: (f: SetCallback<T, K>) => void
}

export type UseStore<T> = <K extends keyof T>(key: K) => Pick<T[K], Exclude<keyof T[K], "init">>