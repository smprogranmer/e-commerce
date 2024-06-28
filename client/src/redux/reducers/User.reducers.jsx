import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        }
    }
});

export const { loginRequest, loginSuccess, loginFail, clearError, clearMessage } = userSlice.actions;
export default userSlice.reducer;