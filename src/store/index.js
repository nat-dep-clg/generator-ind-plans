import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

import userReducer from "./slices/userSlice.js";
import {rootapi} from "./apis/root.js";



const store = configureStore({
    reducer: {
        userState: userReducer,
        [rootapi.reducerPath]: rootapi.reducer,
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware()
            .concat(rootapi.middleware)
    },
    devTools: true
})

setupListeners(store.dispatch)

export {store}
