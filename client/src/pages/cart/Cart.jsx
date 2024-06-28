import { useState } from "react";
import React from "react";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import borka_1 from "../assets/borka_1.jpg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import CartamountToggle from "../../components/cartamount/CartamountToggle";
import {
  useDeleteCardMutation,
  useGetCardsQuery,
} from "../../redux/api/cardApi";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
const Cart = () => {
  const navigate = useNavigate()
  const { data: cartItems, isLoading, error } = useGetCardsQuery();
  console.log("🚀 ~ Cart ~ cartItems:", cartItems)
  const [deleteCart] = useDeleteCardMutation();
  // console.log(data.length)

  const price = 2000;
  const [amount, setAmount] = useState(1);

  const handleCatItemRemove = async (itemId) => {
    try {
      await deleteCart(itemId).unwrap();
      console.log(`Item with id ${itemId} removed successfully`);
      toast.success("Item removed successfully")
    } catch (err) {
      console.error("Failed to remove the item: ", err);
      toast.error("Failed to remove the item")
    }
  };

  const handleCheckOut = async () => {
    if(!cartItems || cartItems?.cartProducts.length === 0) {
      toast.error("Please add at least one item to your cart");
    } else {
      navigate("/checkout");
    }
  }
  return isLoading ? (
    <Loader />
  ) : (
    <section className="Cart">
      <div className="Cart_wrapper container">
        <div className="cart_header">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
          <p>Remove</p>
        </div>
        {cartItems?.cartProducts.map((item, index) => (
          <div key={item._id} className="cart_item">
            <div className="cart_img">
              <figure>
                <img src={item.image?.url} alt="" />
              </figure>
            </div>
            <div className="cart_price">
              <p>{item.price}</p>
            </div>
            <CartamountToggle {...item} />
            <div className="cart_subtotal">
              <p>{item.quantity * item.price}</p>
            </div>
            <div className="cart_remove">
              <MdDeleteOutline onClick={() => handleCatItemRemove(item._id)} />
            </div>
          </div>
        ))}
        <div className="summery_container">
        <div className="cart_sammary">
          <h3>Order Summary</h3>
          <div className="total">
            <div>
              <p>Subtotal</p>
              <p>${amount * price}</p>
            </div>
            <div>
              <p>Shipping Fee</p>
            </div>
            <div>
              <p>Total</p>
              <p>${amount * price}</p>
            </div>
          </div>
          <div className="input__filed">
            <button onClick={handleCheckOut}  className="BTN_NIBH">
              Proceed to checkout
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
