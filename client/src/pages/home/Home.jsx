import React from 'react'
import './home.css'
import { Borka, abaya, category, products } from "../../data";
import Card from '../../components/card/Card'
import { useGetProductsQuery } from '../../redux/api/api';
const Home = () => {

  const { data, isLoading } = useGetProductsQuery("");
  console.log("🚀 ~ Home ~ data:", data)

  return (
    <section className='hero_container'>
      <div className="Hero">
        <div className='hero_text'>
          <h1>Welcome to New Irani Borka House</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quas veritatis quibusdam similique velit suscipit earum quod voluptatum omnis! Voluptate.</p>
        </div>
      </div>

      <div className='tending_container container'>
        <h1>Tending Now</h1>
        <div className="left_imgs">
            {abaya.map(({image}) => {
              return (
                <figure>
                  <img src={image[0].url} alt="" srcset="" />
                </figure>
              )
            })}
          </div>
      </div>

      <div className="new_available_container container ">
        <h1>new Arrivals</h1>
        <div className='new_available'>
          {data?.map((borka) => {
            return (
              <Card {...borka} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Home