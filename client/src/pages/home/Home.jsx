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
          <h1>
            Welcome to <span>ᴺᵉʷ</span> <span> 𝓘𝓻𝓪𝓷𝓲 𝓑𝓸𝓻𝓴𝓪 𝓗𝓸𝓾𝓼𝓮</span>
          </h1>
          <p>we provide high quality unique deigns at the best price</p>
          <button class="button">
Get in touch
<div class="hoverEffect">
<div>
</div>
</div></button>
        </div>
        <div class="custom-shape-divider-bottom-1722189020">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
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
