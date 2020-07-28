export type ArgProps = {
    disableAutoFreeze?: boolean
}

export type Init = { [k: string]: {} }

export type SetStore<T> = {
    [K in keyof T]: (f?: (d: T[K] & { init: T[K] }) => void) => void
}

export type UseStore<T> = <K extends keyof T>(key: K) => T[K]