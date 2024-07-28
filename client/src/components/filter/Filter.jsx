import React from 'react'
import { category } from '../../data'
import { AiOutlineDown } from "react-icons/ai";
const Filter = () => {
  return (
    <div className="products_category">
    <li className="filter">Filter</li>
    <div className="category_items">
      {category.map(({ name, dropDown }, index) => (
        <li key={`category-${index}`} onClick={() => toggleDropdown(index)}>
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
  </div>

  )
}

export default Filter