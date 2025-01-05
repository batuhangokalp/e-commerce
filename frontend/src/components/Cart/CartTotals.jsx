import { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../../context/CartProvider";
import { message } from "antd";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
const API_URL = import.meta.env.VITE_API_BASE_URL;

const CartTotals = () => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const { cartItems } = useContext(CartContext);
  const cargoFee = 15;

  const storedAuth = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const cartItemsTotal = cartItems.map((cartItem) => {
    const itemTotal = cartItem?.price * cartItem.quantity;

    return itemTotal;
  });

  const subTotals = cartItemsTotal.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cartTotals = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  const handlePayment = async () => {
    if (!storedAuth) {
      return message.info(
        "Ödeme yapabilmek için giriş yapmanız gerekmektedir!"
      );
    }
    const body = {
      products: cartItems,
      user: storedAuth,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };

    try {
      const stripe = await loadStripe(STRIPE_PUBLIC_KEY);

      const response = await fetch(`${API_URL}api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        return message.error("Ödeme işlemi başarısız!");
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg" onClick={handlePayment}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};
export default CartTotals;
