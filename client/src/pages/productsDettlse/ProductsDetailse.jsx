import React, { useState } from "react";
import Images from "../../components/Images/Images";
import { colors, img, sizes } from "../../data";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import "./products.css";
// import { set } from "react-hook-form";
import PagePaginaton from "../../components/pagePaginations/PagePaginaton";
import CartamountToggle from "../../components/cartamount/CartamountToggle";
import { useProductDetailsQuery } from "../../redux/api/api";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const ProductsDetailse = () => {
  const { id } = useParams();
  console.log("🚀 ~ ProductsDetailse ~ productId:",id)
  const { data = {}, isLoading, error } = useProductDetailsQuery(id);
  const product = data.product || {};
  console.log("🚀 ~ ProductsDetailse ~ data:", product.stock)

  const [pSizes, setSizes] = useState(0);


  return isLoading ? <Loader/> : (
    <>
      <section>
        <div className="products_details container">
          <div className="product_image">
            <Images imgs={product.image} />
          </div>
          <div className="product_data">
            <div className="product_price_name">
              <h2>exart koti borka with stone work</h2>
              <p>
                <del>1500</del>
              </p>
            </div>

            <div className="product_wrapper">
              <div className="product_size">
                <span> Availabe Sizes</span>
                <ul>
                  {sizes.map((size, index) => {
                    return (
                      <li key={index} className={pSizes === index ? "active_btn" : ""} onClick={() => setSizes(index)}>
                        {size}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="product_color">
                <span>Availabe Size</span>
                <ul>
                  {colors.map((color, index) => {
                    return <li key={index} style={{ background: color }}></li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="product_qty">
              <p>
                <span>Last {product.stock} left</span>- make it your!
              </p>
              <div>
                <CartamountToggle stock={product.stock}/>
                <button className="btn_secondery">
                  Add To Card
                  <FiShoppingCart />
                </button>
              </div>

            </div>
          </div>
        </div>

      </section>
      <section>
        <h2>Product Dettilse</h2>
        <div>

        </div>
      </section>
    </>
  );
};

export default ProductsDetailse;
