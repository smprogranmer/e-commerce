import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./cartamounttoggle.css";
import { useUpdateCardMutation } from "../../redux/api/cardApi";

const CartamountToggle = ({ _id, stock, quantity }) => {
  // console.log("🚀 ~ CartamountToggle ~ cartId:", cartId)
  const [amount, setAmount] = useState(quantity === undefined ? 1 : quantity);
  const [updateCart] = useUpdateCardMutation();

  const setDecrement = async () => {
    if (amount > 1) {
      setAmount(amount - 1);
      if( _id !== undefined) {
        const res = await updateCart({ cartId: _id, quantity: amount - 1 });
      }
    //   console.log("🚀 ~ setDecrement ~ res:", res);
    }
  };

  const setIncrement = () => {
    if (amount < stock) {
      setAmount(amount + 1);
      if( _id!== undefined) {
        const res = updateCart({ cartId: _id, quantity: amount + 1 });
      }
    //   updateCart({ cartId: _id, quantity: amount + 1 });
    }
  };

  return (
    <div className="qty_btn">
      <button className="btnOne" onClick={setDecrement}>
        <AiOutlineMinus />
      </button>
      <p>{amount}</p>
      <button className="btnOne" onClick={setIncrement}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default CartamountToggle;
