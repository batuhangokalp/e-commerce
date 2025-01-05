import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { message } from "antd";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");

  const { cartItems, setCartItems } = useContext(CartContext);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Boş değer girilemez!");
    }
    try {
      const response = await fetch(`${API_URL}api/coupons/code/${couponCode}`);

      if (!response.ok) {
        return message.warning("Girdiğiniz kupon kodu yanlış!");
      }
      const data = await response.json();
      const discountPercent = data.discountPercent;

      const updatedCartItems = cartItems.map((cartItem) => {
        const updatedPrice = cartItem.price * (1 - discountPercent / 100);
        return { ...cartItem, price: updatedPrice };
      });
      setCartItems(updatedCartItems);

      message.success(`${couponCode} kupon kodu aktif edildi!`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};
export default CartCoupon;
