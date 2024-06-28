// import { configureStore } from "@reduxjs/toolkit";
// // import CounterReducer from "../futhers/CounterSlice";
// import ProductsReducer from "../redux/FetchProducts/Products.slice";
// // import  counterDetelseReducer  from "../futhers/CounterDettelse";
// import  UsersReducers  from "../futhers/Users";
// import  UserReducers  from "../redux/reducers/User.reducers";
// import registerReducer  from "../redux/Register/Register.reducer";

// const store = configureStore({
//     reducer:{
//         GetAllProducts: ProductsReducer,
//         // GetOneProducts: counterDetelseReducer,
//         getUsers: UserReducers,
//         // loginUsers: userReducers,
//         registerUser: registerReducer
//     }
// })

// export default store
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { userApi } from './userApi';
import authSlice from '../redux/reducers/auth';
import api from '../redux/api/api';
import cardApi from '../redux/api/cardApi';

const store = configureStore({
  reducer: {
    // [userApi.reducerPath]: userApi.reducer,
    [api.reducerPath]: api.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
    [authSlice.name] : authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>[...getDefaultMiddleware(),api.middleware,cardApi.middleware]
});

setupListeners(store.dispatch);

export default store;