import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import CartProvider from "./context/CartProvider.jsx";
import { Layout } from "./layouts/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <CartProvider>
      <Layout>
        <App />
      </Layout>
    </CartProvider>
  </BrowserRouter>
);
