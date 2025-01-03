import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";
import "./Reviews.css";
const Reviews = ({ active, productData }) => {
  return (
    <div className={`tab-panel-reviews ${active}`}>
      {productData?.reviews?.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {productData?.reviews?.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h2>Henüz yorum yok!</h2>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm />
      </div>
    </div>
  );
};
export default Reviews;

Reviews.propTypes = {
  active: PropTypes.string,
  productData: PropTypes.object,
};
