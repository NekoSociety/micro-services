/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'

/*----------------------------------------------------------------------------
Types
----------------------------------------------------------------------------*/
interface ICounter {
  value: number
}

/*----------------------------------------------------------------------------
Constants
----------------------------------------------------------------------------*/
const initialState: ICounter = {
  value: 0,
}

/*----------------------------------------------------------------------------
Slice
----------------------------------------------------------------------------*/
export const counter = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload
    },
  },
})

export const { increment, incrementByAmount, decrement, decrementByAmount, reset } = counter.actions
export const getCount = (state: RootState) => state.counterReducer.value

export default counter.reducer
