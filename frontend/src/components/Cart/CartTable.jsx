import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CartProvider";
const CartTable = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {cartItems.length > 0 &&
          cartItems.map((cartItem) => (
            <CartItem
              key={cartItem._id}
              cartItem={cartItem}
              removeFromCart={()=>removeFromCart(cartItem?._id)}
            />
          ))}
      </tbody>
    </table>
  );
};
export default CartTable;
