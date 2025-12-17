// import { BsFillStarFill } from "react-icons/bs";
// import FavoriteContext from "../../Context/FavoriteContext";
// import { useNavigate } from "react-router-dom";
// import { Tag } from "antd";
// import "./BookItem.css";

// const BookItem = (props) => {
//   let navigate = useNavigate();
//   const onClickBookItem = () => {
//     const { bookDetails } = props;
//     const { id } = bookDetails;
//     return navigate(`/books/${id}`);
//   };
//   const { bookDetails } = props;
//   const { id, title, readStatus, avgRating, authorName, coverPic, genres } =
//     bookDetails;

//   return (
//     <FavoriteContext.Consumer>
//       {(value) => {
//         const { onToggleFavorite, favoriteList } = value;

//         const onChangeFavorite = () => {
//           onToggleFavorite(bookDetails);
//         };
//         return (
//           <li className="book-item-list-container">
//             <div className="book-item-btn">
//               <button
//                 className="book-item-btn"
//                 onClick={onClickBookItem}
//                 type="button"
//               >
//                 <img
//                   className="book-item-cover-pic"
//                   src={`http://localhost:8080${coverPic}`}
//                   alt={title}
//                 />
//               </button>
//             </div>
//             <div className="book-item-details-card-container">
//               <h1 className="book-item-title">{title}</h1>
//               <p className="book-item-author-name">{authorName}</p>
//               {genres?.map((g) => (
//                 <Tag color="blue" key={g.genreId}>
//                   {g.name}
//                 </Tag>
//               ))}
//               <div className="book-item-avg-rating-container">
//                 <div className="book-item-avg-rating">Avg Rating</div>
//                 <BsFillStarFill className="book-item-start-icon" />
//                 <div className="book-item-rating">{avgRating}</div>
//               </div>
//               <p className="book-item-status-heading">
//                 Status: <span className="book-item-status">{readStatus}</span>
//               </p>
//             </div>
//           </li>
//         );
//       }}
//     </FavoriteContext.Consumer>
//   );
// };

// export default BookItem;
import { BsFillStarFill } from "react-icons/bs";
import FavoriteContext from "../../Context/FavoriteContext";
import { useNavigate } from "react-router-dom";
import { Card, Image, Tag, Typography, Space } from "antd";
import ReadingTracker from "../ReadingTracker/ReadingTracker";

const { Title, Text } = Typography;

const BookItem = (props) => {
  const navigate = useNavigate();
  const { bookDetails } = props;
  const { id, title, readStatus, avgRating, authorName, coverPic, genres } =
    bookDetails;

  const onClickBookItem = () => {
    navigate(`/books/${id}`);
  };

  return (
    <FavoriteContext.Consumer>
      {(value) => {
        const { onToggleFavorite } = value;

        const onChangeFavorite = () => {
          onToggleFavorite(bookDetails);
        };

        return (
          <li style={{ listStyle: "none" }}>
            <Card
              hoverable
              style={{ width: 420, borderRadius: 12 }}
              bodyStyle={{ padding: 12 }}
              onClick={onClickBookItem}
            >
              <Space onClick={(e) => e.stopPropagation()}>
                {console.log("bookDetails in BookItem:", bookDetails)}
                <ReadingTracker
                  bookId={id}
                  currentPage={bookDetails.currentPage}
                  totalPages={bookDetails.totalPages}
                  percentDone={bookDetails.percentDone}
                />
              </Space>

              <Space align="start" size={16}>
                {/* Cover */}
                <Image
                  width={120}
                  height={170}
                  preview={false}
                  src={`http://localhost:8080${coverPic}`}
                  style={{ borderRadius: 10, objectFit: "cover" }}
                />

                {/* Info */}
                <Space direction="vertical" size={4} style={{ width: "100%" }}>
                  <Title level={5} style={{ margin: 0 }}>
                    {title}
                  </Title>

                  <Text type="secondary">{authorName}</Text>

                  {/* Genres */}
                  <Space size={[4, 4]} wrap>
                    {genres?.map((g) => (
                      <Tag color="blue" key={g.genreId}>
                        {g.name}
                      </Tag>
                    ))}
                  </Space>

                  {/* Rating */}
                  <Space size={6}>
                    <Text>Avg Rating</Text>
                    <BsFillStarFill style={{ color: "#fadb14" }} />
                    <Text>{avgRating}</Text>
                  </Space>

                  {/* Status */}
                  <Text>
                    Status:{" "}
                    <Text strong style={{ color: "#1677ff" }}>
                      {readStatus}
                    </Text>
                  </Text>
                </Space>
              </Space>
            </Card>
          </li>
        );
      }}
    </FavoriteContext.Consumer>
  );
};

export default BookItem;
