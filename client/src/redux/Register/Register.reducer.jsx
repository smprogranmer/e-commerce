// import { createReducer } from "@reduxjs/toolkit";

// const registerReducer = createReducer({},{
//     registerRequest:(state) =>{
//         state.loading = true;
//     },
//     registerSuccess:(state,action) =>{
//         state.loading = false;
//         state.user = action.payload.user;
//         state.message = action.payload.message;
//     },
//     loginFail:(state,action) =>{
//         state.loading = false;
//         state.error = action.payload.error;
//     },
//     clearError: state =>{
//         state.error = null
//     },
//     clearMessage: state =>{
//         state.message = null
//     }

// })

// export default registerReducer

import { createReducer } from "@reduxjs/toolkit";

const registerReducer = createReducer({}, (builder) => {
    builder
        .addCase('registerRequest', (state) => {
            state.loading = true;
        })
        .addCase('registerSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase('loginFail', (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
        .addCase('clearError', (state) => {
            state.error = null;
        })
        .addCase('clearMessage', (state) => {
            state.message = null;
        });
});

export default registerReducer;