import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.ts";
import companySlice from "./slices/companySlice.ts";

const store = configureStore({
    reducer: {
        'user': userSlice,
        'company': companySlice,
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
})

export default store;