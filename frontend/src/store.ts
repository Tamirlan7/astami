import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.ts";
import companySlice from "./slices/companySlice.ts";
import popupNotificationSlice from "@slices/popupNotificationSlice.ts";

const store = configureStore({
    reducer: {
        'user': userSlice,
        'company': companySlice,
        'popupNotification': popupNotificationSlice,
},
    devTools: import.meta.env.NODE_ENV !== 'production',
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store;