import React from 'react'
import './cartItemList.css'
const CartItemList = ({cartItems}) => {
    const subtotal = cartItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal + 100
  console.log("🚀 ~ CartItemList ~ cartItems:", cartItems)
  return (
    <div className="checkOut_sammary ">
    <h3>Order Summary</h3>
    {cartItems?.map(({image,name,quantity,size,price,_id}) => {
      return (
        <div className="sammary_item" key={_id}>
          <div className="sammary_Item_container">
            <div className="sammery_item_image_container">
              <img
                src={image?.url}
                alt=""
              />
            </div>
            <div>
              <p>{name}</p>
              <p>size: {size} * {quantity}</p>
            </div>
          </div>
          <p>{price * quantity}</p>
        </div>
      );
    })}
    <div className="total">
      <div>
        <p>Subtotal</p>
        <p>{subtotal}</p>
      </div>
      <div>
        <p>Shipping Fee</p>
        <div class="radio-input">
          <label class="label">
            <input
              value="value-1"
              name="value-radio"
              checked="true"
              id="value-1"
              type="radio"
            />
            <p class="text">Cash on delivery 100</p>
          </label>
        </div>
      </div>
      <div>
        <p>Total</p>
        <p>{subtotal + 100}</p>
      </div>
    </div>
  </div>
  )
}

export default CartItemList