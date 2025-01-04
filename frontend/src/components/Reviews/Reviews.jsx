import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";
import "./Reviews.css";
import { message } from "antd";
const Reviews = ({ active, productData, setProductData }) => {
  const [users, setUsers] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const thisReview = [];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}api/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Veri getirme işlemi başarısız!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [API_URL]);

  productData?.reviews?.forEach((review) => {
    const matchingUsers = users?.filter((user) => user._id === review.user);

    matchingUsers.forEach((matchingUser) => {
      thisReview.push({
        review: review,
        user: matchingUser,
      });
    });
  });

  return (
    <div className={`tab-panel-reviews ${active}`}>
      {productData?.reviews?.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((review, index) => (
                <ReviewItem key={index} reviewItem={review} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h2>Henüz yorum yok!</h2>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm productData={productData} setProductData={setProductData} />
      </div>
    </div>
  );
};
export default Reviews;

Reviews.propTypes = {
  active: PropTypes.string,
  productData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setProductData: PropTypes.func,
};
