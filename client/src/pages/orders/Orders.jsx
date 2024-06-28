import React, { useEffect, useState } from 'react'
import CartItemList from '../../components/cartItemList/CartItemList'
import { myOrders } from '../../service/user.service'
import './order.css'
const Orders = () => {
    const [orders,setOrders] = useState([])
    console.log("🚀 ~ Orders ~ orders:", orders)
    useEffect(() =>{
        myOrders()
        .then((res) => {
            setOrders(res?.data?.orders)
            console.log(res)
        })
        .catch((error) => console.log(error))
    },[])
  return (
    <section className='container'>
        <div className='order_header' >
            <p>OrderId</p>
            <p>Order Date</p>
            <p>Total</p>
        </div>
      {orders?.map((order) =>{
        // console.log(order.order)
       return  <div className='orders'>
            <p>{order._id.slice(0,5)}</p>
            <p>{order.createdAt.slice(0,10)}</p>
            <p>{order.totalPrice}</p>

            <hr />
  
        </div>
      })}
    </section>
  )
}

export default Orders