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
    movie: "Fargo"
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
    const { movie } = useStore("movie")

    const set = setStore()

    const clickHandler = ()=> {
        
        set.fruits((draft, init)=>{
            draft.apples += 1
            return draft
        }) 
        set.movie("The Mask")
        
    }

    return(
        <div>
            <div>Apples: {apples}</div>
            <button onClick={()=> clickHandler()}>Increment</button>
        </div>
    )
}

```