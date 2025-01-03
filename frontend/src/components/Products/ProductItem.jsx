import { useContext } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { CartContext } from "../../context/CartProvider";

import "./ProductItem.css";
const ProductItem = ({ product }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === product._id
  );

  const originalPrice = product?.price?.currentPrice;
  const discountPercentage = product?.price?.discountPrice;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img src={product?.images?.[0]} alt="" className="img1" />
          <img src={product?.images?.[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          <br />
          {product?.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">$ {discountedPrice.toFixed(2)}</strong>
          <span className="old-price">$ {originalPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">- {discountPercentage}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            disabled={filteredCart}
            onClick={() =>
              addToCart({
                ...product,
                price: discountedPrice,
              })
            }
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`product/${product._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default ProductItem;

ProductItem.propTypes = {
  product: Proptypes.object,
};
