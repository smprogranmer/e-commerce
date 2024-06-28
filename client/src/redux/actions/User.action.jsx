import axios from "axios";



 export const login = (email,password) => async(dispatch) =>{
    try {
        dispatch({type:"loginReqest"});
        const {data} = await axios.post(`/api/v1/users/login`,{email,password},{
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials: true,
        });

        console.log(data)
        dispatch({type: 'loginSuccess', payload: data})
    } catch (error) {
        dispatch({type:"loginFail", payload: error.response.data.message})
    }
}