import React from "react";
import "./checkout.css";

import { orders } from "../../service/user.service";
import { useForm } from "react-hook-form";
import { useDeleteAllCardsMutation, useGetCardsQuery } from "../../redux/api/cardApi";
import { toast } from "react-toastify";
import CartItemList from "../../components/cartItemList/CartItemList";
const CheckOut = () => {
  const { data: checkOutItems, isLoading, error } = useGetCardsQuery();
 // Move the hook outside the function

  console.log("🚀 ~ CheckOut ~ checkOutItems:", checkOutItems);
  // console.log("🚀 ~ CheckOut ~ data:", data)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log("🚀 ~ CheckOut ~ errors:", errors);
  const [tumi ] = useDeleteAllCardsMutation();

  const handleOrders = (addressData) => {
    const hello = checkOutItems.cartProducts;
    orders({ addressData, hello, total: total })
      .then(() => {
        toast.success("Order successfully");
        tumi(); // Call the hook directly
      })
      .catch((error) => {
        console.log("🚀 ~ handleOrders ~ error:", error);
      });
  };

  return (
    <section className="checkOut_section container">
      <form onSubmit={handleSubmit(handleOrders)}>
        <h3>Contact information</h3>
        <div>
          <div>
            <input
              type="text"
              placeholder="Please enter your first name"
              {...register("firstName", {
                required: true,
              })}
            />
            <input
              type="text"
              placeholder="Please enter your last name"
              {...register("lastName", {
                required: true,
              })}
            />
          </div>
          <input
            type="number"
            name=""
            placeholder="Please enter your phone number"
            id=""
            {...register("phoneNumber", {
              required: true,
            })}
          />
          <input
            type="email"
            name=""
            placeholder="Please enter your email"
            id=""
            {...register("email", {
              required: true,
            })}
          />
          <input
            type="text"
            name=""
            placeholder="Please enter your address"
            id=""
            {...register("address", {
              required: true,
            })}
          />
          <input
            type="text"
            name=""
            placeholder="Please enter your city"
            id=""
            {...register("city", {
              required: true,
            })}
          />
        </div>
        <button className="BTN_NIBH submit_btn" type="submit">
          Place Oder
        </button>
      </form>
      <div>
        <CartItemList cartItems={checkOutItems?.cartProducts}/>
      </div>
    </section>
  );
};

export default CheckOut;
