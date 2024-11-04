import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name:"search",
    initialState:{st:null},
    reducers:{
        searchterm:(state, action)=>{
            console.log(state, action);
            state.st = action.payload;
            console.log(state.st);
        }
    }
})

export const {searchterm} = searchSlice.actions;
export default searchSlice.reducer;