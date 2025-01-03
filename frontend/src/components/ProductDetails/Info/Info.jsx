import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../../../context/CartProvider";
import PropTypes from "prop-types";
import "./Info.css";
const Info = ({ productData }) => {
  const quantityRef = useRef();

  const { addToCart, cartItems } = useContext(CartContext);

  const originalPrice = productData?.price?.currentPrice;
  const discountPercentage = productData?.price?.discountPrice;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const filteredProduct = cartItems?.find(
    (cartItem) => cartItem._id === productData._id
  );

  useEffect(() => {
    if (filteredProduct && quantityRef.current) {
      quantityRef.current.value = filteredProduct.quantity;
    } else if (quantityRef.current) {
      quantityRef.current.value = 1;
    }
  }, [filteredProduct]);

  return (
    <div className="product-info">
      <h1 className="product-title">{productData?.name}</h1>
      <div className="product-review">
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
        <span>2 reviews</span>
      </div>
      <div className="product-price">
        <s className="old-price">${originalPrice?.toFixed(2)}</s>
        <strong className="new-price">${discountedPrice?.toFixed(2)}</strong>
      </div>
      <p
        className="product-description"
        dangerouslySetInnerHTML={{ __html: productData?.description }}
      ></p>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {productData?.colors?.map((color, index) => (
                <div className="color-wrapper" key={index}>
                  <label style={{ backgroundColor: `#${color}` }}>
                    <input type="radio" name="product-color" />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {productData?.sizes?.map((size, index) => (
                <span key={index}>{size.toUpperCase()}</span>
              ))}
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredProduct}
              onClick={() =>
                addToCart({
                  ...productData,
                  price: discountedPrice,
                  quantity: parseInt(quantityRef.current.value),
                })
              }
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>Pants , Women</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
};
export default Info;

Info.propTypes = {
  productData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
