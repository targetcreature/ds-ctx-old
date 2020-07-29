export type ArgProps = {
    disableAutoFreeze?: boolean
}

export type Init = { [k: string]: {} }
export type SetCallback<K extends keyof T, T> = (f: (d: T[K] & { init: T[K] }) => void) => void
export type UseStore<T> = <K extends keyof T>(key: K) => T[K]
export type UseSetStore<T> = <K extends keyof T>(key: K) => SetCallback<K, T>