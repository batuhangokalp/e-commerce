import { useState } from "react";
import ProductItem from "./ProductItem";
import productsData from "../../data.json";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./Products.css";
const Products = () => {
  const [products] = useState(productsData);

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
              {products.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Products;
