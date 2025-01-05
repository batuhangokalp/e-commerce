import { useState } from "react";
import { message } from "antd";
import Proptypes from "prop-types";
import "./Search.css";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchText, setSearchText] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
    setSearchText("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchText.trim().length === 0) {
      message.warning("Boş karakter aranamaz.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}api/products/search/${searchText.trim()}`
      );

      if (!response.ok) {
        message.error("Ürün getirme hatası");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search a product"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${searchResults?.length === 0 ? "flex" : "grid"}`,
            }}
          >
            {searchResults?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{ justifyContent: "center", width: "100%" }}
              >
                😔Aradığınız Ürün Bulunamadı 😔
              </a>
            )}
            {searchResults?.length > 0 &&
              searchResults?.map((searchResult) => (
                <div key={searchResult?._id}>
                  <a href="#" className="result-item">
                    <img
                      src={searchResult?.images[0]}
                      className="search-thumb"
                      alt=""
                    />
                    <div className="search-info">
                      <h4>{searchResult?.name}</h4>
                      <span className="search-sku">SKU: PD0016</span>
                      <span className="search-price">
                        {searchResult?.price?.currentPrice.toFixed(2)}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
    </div>
  );
};
export default Search;

Search.propTypes = {
  isSearchShow: Proptypes.bool,
  setIsSearchShow: Proptypes.func,
};
