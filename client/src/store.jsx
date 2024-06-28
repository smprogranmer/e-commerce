import { createStore, applyMiddleware } from "redux";
import CounterReducer from "./service/reducer/Counter.reducer";
import thunk from 'redux-thunk'

const store = createStore(CounterReducer, applyMiddleware(thunk))


export default store