import "./products.css";
import { category, products } from "../../data";
import { AiOutlineDown } from "react-icons/ai";
import Loader from "../loader/Loader";
import Card from "../card/Card";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/api";
import { IoClose } from "react-icons/io5";

const Products = ({ isLoading, productsData, checkedItem }) => {
  const [checkedItems, setCheckedItems] = useState({});
  console.log("🚀 ~ Products ~ checkedItems:", checkedItems);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const { data: checkedProducts } = useGetProductsQuery(
    Object.keys(checkedItems)[0]?.toLowerCase()
  );
  
  // mobile_category functionality
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  console.log("🚀 ~ Products ~ checkedProducts:", checkedProducts);

  const toggleDropdown = (index) => {
    setVisibleDropdown(visibleDropdown === index ? null : index);
  };

  const handleCheckboxChange = ({ target }) => {
    const { name, checked } = target;
    setCheckedItems((prev) => ({
      [name]: checked,
    }));
  };

  const productsToDisplay = useMemo(
    () => (checkedProducts?.length ? checkedProducts : productsData),
    [checkedProducts, productsData]
  );
  console.log("🚀 ~ Products ~ productsToDisplay:", productsToDisplay);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="Product__container">
      <div className="container">
        <div className="products_category">
          <li className="filter" onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}>Filter</li>
          <div className="category_items">
            {category.map(({ name, dropDown }, index) => (
              <li
                key={`category-${index}`}
                onClick={() => toggleDropdown(index)}
              >
                {name}
                <AiOutlineDown />
                {visibleDropdown === index && (
                  <form className="category_form">
                    {dropDown.map((item, subIndex) => (
                      <div key={`subcategory-${index}-${subIndex}`}>
                        <input
                          type="checkbox"
                          name={item.name}
                          id={item.name}
                          checked={checkedItems[item.name] || false}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={item.name}>{item.name}</label>
                      </div>
                    ))}
                  </form>
                )}
              </li>
            ))}
          </div>
          <li className="sort">
            Low to high <AiOutlineDown />
          </li>
          {/* mobile cagegory div  */}
          <div className={`mobile_category ${isMobileCategoryOpen ? "mobile_category_active" : ""}`}>
            <IoClose className="close_bars" onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)} />
            <h3>Category</h3>
            {category.map(({ name, dropDown }, index) => (
              <div key={`mobile-category-${index}`} className="mobile_category_container">
                <h4>{name}</h4>
                <ul className="mobile_category_items">
                  {dropDown.map((item, subIndex) => (
                    <li key={`mobile-subcategory-${index}-${subIndex}`}>
                      <input
                        type="checkbox"
                        name={item.name}
                        id={item.name}
                        checked={checkedItems[item.name] || false}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={item.name}>{item.name}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="product-list">
          {productsToDisplay.map((product, index) => {
            return <Card key={product._id} {...product} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Products);
