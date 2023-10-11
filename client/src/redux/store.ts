/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import counterReducer from './features/counter'

import { userApi } from '@/redux/services/user-api'

/*----------------------------------------------------------------------------
Types
----------------------------------------------------------------------------*/
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/*----------------------------------------------------------------------------
Store
----------------------------------------------------------------------------*/
export const store = configureStore({
  reducer: {
    counterReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([userApi.middleware]),
})

setupListeners(store.dispatch)
