import PropTypes from "prop-types";
import "./BlogDetails.css";
const BlogDetails = ({ blogData }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(blogData?.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <section className="single-blog">
      <div className="container">
        <article>
          <figure>
            <a href="#">
              <img src={blogData?.image} alt="" />
            </a>
          </figure>
          <div className="blog-wrapper">
            <div className="blog-meta">
              <div className="blog-date">
                <a href="#">{formattedDate}</a>
              </div>
            </div>
            <h1 className="blog-title">{blogData?.name}</h1>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blogData?.description }}
            ></div>
          </div>
        </article>
      </div>
    </section>
  );
};
export default BlogDetails;

BlogDetails.propTypes = {
  blogData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setBlogData: PropTypes.func,
};
