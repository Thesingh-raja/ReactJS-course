import { createSlice } from "@reduxjs/toolkit"
const initialState= {counter:0,showCounter:true}
const initialCounterState = {counter:0, showCounter:true, isAuthenticated:false}

const counterSlice = createSlice({
    name:'counter',
    initialState,
    initialCounterState,
    reducers:{
        increment(state){
            state.counter++
        },
        decrement(state){
            state.counter--
        },
        increase(state,action){
            state.counter= state.counter +action.payload
        },
        toggleCounter(state){
            state.showCounter=!state.showCounter
        }
    }
})
export const counterActions = counterSlice.actions;

export default counterSlice.reducer