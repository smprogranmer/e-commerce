import { ADD_USER_FAILD, ADD_USER_REQUEST, ADD_USER_SUCESS, } from "../constant/counter.action";

const initialState = {
    user: [],
    isLoading: false,
    error: null
}

const CounterReducer = (state = initialState,action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case ADD_USER_SUCESS:
            return{
                ...state,
                isLoading:false,
                user: action.peload
            }
        case ADD_USER_FAILD:
            return{
                error: action.error
            }
        default:
            return state
    }
}

export default CounterReducer