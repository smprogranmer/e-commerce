import React from "react";
import "./home.css";
import { Borka, abaya, category, products } from "../../data";
import Card from "../../components/card/Card";
import { useGetProductsQuery } from "../../redux/api/api";
const Home = () => {
  const { data, isLoading } = useGetProductsQuery("");
  console.log("🚀 ~ Home ~ data:", data);

  return (
    <section className="hero_container">
      <div className="Hero">
        <div className="hero_text">
          <h1>Welcome to <span>ᴺᵉʷ</span> <span> 𝓘𝓻𝓪𝓷𝓲 𝓑𝓸𝓻𝓴𝓪 𝓗𝓸𝓾𝓼𝓮</span></h1>
          <p>
            we provide high quality unique deigns at the best price 
          </p>
        </div>
      </div>

      <div className="tending_container container">
        <h1>Tending Now</h1>
        <div className="left_imgs">
          {abaya.map(({ image }) => {
            return (
              <figure>
                <img src={image[0].url} alt="" srcset="" />
              </figure>
            );
          })}
        </div>
      </div>

      {/* category section  */}

      <div className="category_section container">
        <div className="category_box">
          <h2>EMROIDRED BORKA COLLECTION</h2>
          <div class="main_div">
            <button>View Collection</button>
          </div>
        </div>
        <div className="category_box">
          <h2>EXCLUSIVE ABAYA COLLECTION</h2>
          <div class="main_div">
            <button>View Collection</button>
          </div>
        </div>
        <div className="category_box">
          <h2>GORGEOUS HIJAB COLLECTION</h2>
          <div class="main_div">
            <button>View Collection</button>
          </div>
        </div>
      </div>

      <div className="new_available_container container ">
        <h1>new Arrivals</h1>
        <div className="new_available">
          {data?.map((borka) => {
            return <Card {...borka} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
