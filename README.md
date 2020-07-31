# ds-ctx
dumb simple context splitter for nextjs

webpack:
```js
// next.config.js

const withContext = require('next-transpile-modules')(['ds-ctx']);

module.exports = withContext();
```

usage:
```tsx

// stores.ts
export const stores: {[store: string]:{}} = {
    fruits:{
        apples: 1,
        bananas: 2,
        grapes: 3
    },
    cars:{
        truck:{
            type: "pickup",
            color: "red"
        }
    },
    movies:{
        movies: ["Fargo", "Playtime", "Sleeping Beauty"]
    }
}
```

```tsx
// app.tsx

import { stores } from "./stores"
import { Component } from "./component"
import { useDSC } from "ds-context"

const args = {
    disableAutoFreeze: true
}

const [ ContextProvider, useStore, setStore ] = useDSC(stores, args)

export default ()=>
    <ContextProvider>
        <Component/>
    </ContextProvider>

export {useStore, setStore}
```

```tsx
// component.tsx

import {useStore, setStore} from "./app.tsx"

export const Component = ()=>{

    const { apples } = useStore("fruits")
    const { truck } = useStore("cars")
    const { movies } = useStore("movies")

    const set = setStore()

    const incrementApples = ()=> 
        set.fruits((draft)=>{
            draft.apples += 1
        }) 

    return(
        <div>
            <div>Apples: {apples}</div>
            <button onClick={()=> incrementApples()}>Increment</button>
        </div>
    )
}

```