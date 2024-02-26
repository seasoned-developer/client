import { applyMiddleware, createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode    : "light", 
    user    : null, 
    token   : null
}

export const authSlice = createSlice({
    name : "auth", 
    initialState,
    reducers : {
        setMode: (state)=>{  
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLogin : (state, action)=>{
            state.user  = action.payload.user; 
            state.token = action.payload.token;
        }, 
        setUpdate :(state, action)=> {
            state.user  = action.payload;
        },
        setLogout: (state) => {
            return {
              ...state,
              user: null,
              mode: "light",
              token: null,
            };
        },

    }
});
export const { 
    setMode,
    setLogin,
    setLogout, 
    setUpdate,
} = authSlice.actions

export default authSlice.reducer;


