import PropTypes from "prop-types";
const ReviewItem = ({ reviewItem }) => {
  const { review, user } = reviewItem;
  const { text, createdAt, rating } = review;
  const { username, avatar } = user;
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src={avatar} alt="image" width={50} />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {Array.from({ length: rating }, (_, index) => (
            <li key={index}>
              <i className="bi bi-star-fill"></i>
            </li>
          ))}
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
        </ul>
        <div className="comment-meta">
          <strong>{username}</strong>
          <span> - </span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
};
export default ReviewItem;

ReviewItem.propTypes = {
  reviewItem: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
