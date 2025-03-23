import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState = {
  countValue: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.countValue++
    },
    decrement(state) {
      state.countValue--
    },
    incrementByAmount(state, action: PayloadAction<{value: number}>) {
      state.countValue += action.payload.value
    },
    decrementByAmount(state, action: PayloadAction<{values: number[], index: string}>) {
      state.countValue -= action.payload.values[+action.payload.index]
    },
  },
})


export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions
console.log(counterSlice)

export const selectCount = (state: RootState): number => state.count.countValue

export default counterSlice.reducer