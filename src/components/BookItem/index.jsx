import { BsFillStarFill } from "react-icons/bs";
import FavoriteContext from "../../Context/FavoriteContext";
import { useNavigate } from "react-router-dom";
import "./index.css";

const BookItem = (props) => {
  let navigate = useNavigate();
  const onClickBookItem = () => {
    const { bookDetails } = props;
    const { id } = bookDetails;
    return navigate(`/books/${id}`);
  };
  const { bookDetails } = props;
  const { id, title, readStatus, rating, authorName, coverPic } = bookDetails;

  return (
    <FavoriteContext.Consumer>
      {(value) => {
        const { onToggleFavorite, favoriteList } = value;

        const onChangeFavorite = () => {
          onToggleFavorite(bookDetails);
        };
        return (
          <li className="book-item-list-container">
            <div className="book-item-btn">
              <button
                className="book-item-btn"
                onClick={onClickBookItem}
                type="button"
              >
                <img
                  className="book-item-cover-pic"
                  src={coverPic}
                  alt={title}
                />
              </button>
            </div>
            <div className="book-item-details-card-container">
              <h1 className="book-item-title">{title}</h1>
              <p className="book-item-author-name">{authorName}</p>
              <div className="book-item-avg-rating-container">
                <div className="book-item-avg-rating">Avg Rating</div>
                <BsFillStarFill className="book-item-start-icon" />
                <div className="book-item-rating">5</div>
              </div>
              <p className="book-item-status-heading">
                Status: <span className="book-item-status">{readStatus}</span>
              </p>
            </div>
          </li>
        );
      }}
    </FavoriteContext.Consumer>
  );
};

export default BookItem;
