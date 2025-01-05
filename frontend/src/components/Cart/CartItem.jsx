import Proptypes from "prop-types";

const CartItem = ({ cartItem, removeFromCart }) => {
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem?.images?.[0]} alt="" />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem?._id)}
        ></i>
      </td>
      <td>{cartItem?.name}</td>
      <td>{cartItem?.price?.toFixed(2)}</td>
      <td className="product-quantity">{cartItem?.quantity}</td>
      <td className="product-subtotal">
        ${(cartItem?.quantity * cartItem?.price).toFixed(2)}
      </td>
    </tr>
  );
};
export default CartItem;

CartItem.propTypes = {
  cartItem: Proptypes.object,
  removeFromCart: Proptypes.func,
};
