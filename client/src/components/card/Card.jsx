import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCreateCardMutation } from "../../redux/api/cardApi";
import { toast } from "react-toastify";
const Card = ({ image, name, price, description, _id,stock, size = 52 }) => {
  console.log("🚀 ~ Card ~ name:", name)
  console.log("🚀 ~ Card ~ image:", image)
  const [createCard] = useCreateCardMutation();

  const handleAddCard = async () => {
    try {
      const result = await createCard({
        image: image[0].url,
        name,
        size,
        price,
        description,
        stock,
        quantity: 1,
        productId: _id,
      }).unwrap();
      console.log("Card added successfully:", result);
      toast.success(result?.message || "Product added to cart successfully");
    } catch (error) {
      console.error("Failed to add card:", error);
      toast.error("Login to add to cart")
    }
    ("");
  };

  return (
    <div className="product-card">
      <NavLink to={`/products-details/${_id}`}>
      <div className="img_box" id="p">
            <img src={image[0]?.url} alt={name} />
          </div>
      </NavLink>
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="price_box">
        <span>${price}</span>
        <button className="btn_secondery" onClick={handleAddCard}>
          <FiShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default Card;
