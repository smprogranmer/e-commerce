import axios from "axios";

export  const registerAction = (name,email,password) => async(dispatch) =>{
    try {
        dispatch({type:"loginReqest"});
        const {data} = await axios.post(`/api/v1/users/register`, {name,email,password},{
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials: true,
        })
        console.log(data)
        dispatch({type:"registerSuccess", payload: data})
    } catch(error) {
        dispatch({type:"registerFail", payload: error.response.data.message})
    }
}