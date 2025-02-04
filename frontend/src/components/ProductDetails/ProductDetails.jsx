import PropTypes from "prop-types";
// import Breadcrumb from "./Breadcrumb/breadcrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import Tabs from "./Tabs/Tabs";
import "./ProductDetails.css";

const ProductDetails = ({ productData, setProductData }) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          {/* <Breadcrumb /> */}
          <div className="single-content">
            <main className="site-main">
              <Gallery productData={productData} />
              <Info productData={productData} />
            </main>
          </div>
          <Tabs productData={productData} setProductData={setProductData} />
        </div>
      </div>
    </section>
  );
};
export default ProductDetails;

ProductDetails.propTypes = {
  productData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setProductData: PropTypes.func,
};
