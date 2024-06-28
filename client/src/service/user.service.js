import { myAxios } from "./helper"


export const login = async (userData) =>{
  const res = await myAxios.post('user/login',userData)
  return res
}
export const logOut = async () =>{
  const res = await myAxios.post('user/logOut')
  return res
}

export const singUp = async (userData) => {
    const res = await myAxios.post('user/register',userData)
    return res
}

export const orders = async (userData) => {
    console.log("🚀 ~ updateUser ~ userData:", userData)
    const res = await myAxios.post('products/orders', userData)
    return res
}

export const changePassword = async (userData) => {
  const res = await myAxios.put('user/me/change-password', userData)
    return res
}
export const getUser = async () => {
    const res = await myAxios.get('user/me')
    return res
}

// get myOrders 

export const myOrders = async () => {
    const res = await myAxios.get('products/my-orders')
    return res
}
