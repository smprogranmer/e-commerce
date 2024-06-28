import {ADD_USER_FAILD, ADD_USER_REQUEST, ADD_USER_SUCESS,} from "../constant/counter.action"
import axios from "axios"




export const IncrementAction = () => async (dispatch) =>{
    dispatch({type : ADD_USER_REQUEST})
    try {
        const res = await axios.get()
        dispatch({
            type: ADD_USER_SUCESS,
            peload: res.data
        })
    } catch (error) {
        dispatch({
            type: ADD_USER_FAILD,
            peload: error.message
        })        
    }
}
