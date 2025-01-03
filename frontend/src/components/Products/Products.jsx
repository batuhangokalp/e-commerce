import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./Products.css";
const Products = () => {
  const [productData, setProductData] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // #region Get categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}api/products`);
        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          console.log("Ürünler getirilemedi!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [API_URL]);
  // #endregion

  const NextBtn = ({ onClick }) => (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );

  const PrevBtn = ({ onClick }) => (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );

  NextBtn.propTypes = {
    onClick: PropTypes.func,
  };

  PrevBtn.propTypes = {
    onClick: PropTypes.func,
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track">
            <Slider {...sliderSettings}>
              {productData.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Products;
