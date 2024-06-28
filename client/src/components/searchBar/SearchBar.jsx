import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchApiQuery } from "../../redux/api/api";
import "./searchBar.css";
import { NavLink, useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchApiQuery(query);

  useEffect(() => {
    if (query.length > 0) {
      // Perform any additional actions if needed when query changes
    }
  }, [query]);

  const handleExploreClick = (productId) => {
    console.log("🚀 ~ handleExploreClick ~ productId:", productId);
    setQuery("");
    navigate(`/products-details/${productId}`);
  };

  return (
    <>
      <div className="search__ber">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <AiOutlineSearch />
      </div>
      {(data?.product?.length > 0) && (query.length > 0) &&  (
        <div className="search_content">
          {data?.product.map((result) => (
            // console.log(result)
            <NavLink
              to={`products-details/${result?._id}`}
              onClick={() => handleExploreClick(result?._id)}
              key={result?._id}
              className="flex items-center"
            >
              <figure>
                <img src={result.image[0]?.url} alt={result.name} />
              </figure>
              <div className="price_name">
                <p>{result?.name}</p>
                <p>{result?.price}</p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
