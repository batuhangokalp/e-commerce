import { useState } from "react";
import PropTypes from "prop-types";
import Reviews from "../../Reviews/Reviews";
import "./Tabs.css";
const Tabs = ({ productData, setProductData }) => {
  const [activeTab, setActiveTab] = useState("desc");
  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };
  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "info")}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" ? "active" : ""
          }`}
        >
          <p
            className="product-description"
            dangerouslySetInnerHTML={{ __html: productData?.description }}
          ></p>
        </div>
        <div
          className={`tab-panel-information content ${
            activeTab === "info" ? "active" : ""
          }`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                    White
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  {productData?.sizes?.map((item, index) => (
                    <span key={index}>
                      {item.toUpperCase()}
                      {index < productData?.sizes?.length - 1 && ", "}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reviews
          productData={productData}
          active={activeTab === "reviews" ? "content active" : "content"}
          setProductData={setProductData}
        />
      </div>
    </div>
  );
};
export default Tabs;

Tabs.propTypes = {
  productData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setProductData: PropTypes.func,
};
