// import Cookies from "js-cookie";
// import { useParams } from "react-router-dom";
// import { BsFillStarFill, BsFillHeartFill } from "react-icons/bs";
// import { TailSpin } from "react-loader-spinner";

// import FavoriteContext from "../../Context/FavoriteContext";
// import AppHeader from "../Header/Header";
// import Footer from "../Footer/Footer";
// import "./BookItemDetails.css";
// import { useEffect, useState } from "react";

// const bookDetailsApiStatuses = {
//   initial: "INITIAL",
//   success: "SUCCESS",
//   failure: "FAILURE",
//   inProgress: "IN_PROGRESS",
// };

// const BookItemDetails = () => {
//   const [bookDetailsData, setBookDetailsData] = useState({});
//   const [bookDetailsApiStatus, setBookDetailsApiStatus] = useState(
//     bookDetailsApiStatuses.initial
//   );
//   const { id } = useParams();

//   useEffect(() => {
//     getBookDetailsApi();
//   }, []);

//   const getBookDetailsApi = async () => {
//     setBookDetailsApiStatus(bookDetailsApiStatuses.inProgress);

//     const bookDetailsApi = `http://localhost:8080/api/books/${id}`;
//     console.log("bookDetailsApi", bookDetailsApi);
//     const jwtToken = Cookies.get("jwt_token");
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     };

//     const response = await fetch(bookDetailsApi, options);

//     if (response.ok === true) {
//       const fetchedData = await response.json();
//       console.log("fetchedData", fetchedData);
//       const updatedData = {
//         bookDetails: {
//           id: fetchedData.bookId,
//           authorName: fetchedData.author,
//           coverPic: fetchedData.image,
//           aboutBook: fetchedData.summary,
//           rating: fetchedData.rate,
//           title: fetchedData.title,
//           //readStatus: fetchedData.book_details.read_status,
//         },
//       };

//       setBookDetailsData(updatedData);
//       console.log("bookDetailsData", bookDetailsData);
//       setBookDetailsApiStatus(bookDetailsApiStatuses.success);
//     } else {
//       setBookDetailsApiStatus(bookDetailsApiStatuses.failure);
//     }
//   };
//   console.log("bookDetailsApiStatus", bookDetailsApiStatus);
//   const onClickRetry = () => {
//     getBookDetailsApi();
//   };

//   const renderBookDetailsInProgressView = () => (
//     <div className="loader-container" testid="loader">
//       <TailSpin color="#8284C7" height={32} width={32} />;
//     </div>
//   );

//   const renderBookDetailsFailureView = () => (
//     <div className="top-rated-books-failure-container">
//       <img
//         className="top-rated-books-failure-image"
//         src="https://res.cloudinary.com/dynx88ls1/image/upload/v1645337269/Group_7522_vwrftq.png"
//         alt="failure view"
//       />
//       <p className="top-rated-books-failure-heading">
//         Something Went Wrong. Please try again.
//       </p>
//       <button
//         className="top-rated-books-failure-btn"
//         onClick={onClickRetry}
//         type="button"
//       >
//         Try Again
//       </button>
//     </div>
//   );

//   const renderBookDetailsSuccessView = () => {
//     console.log("hello world");
//     const { bookDetails } = bookDetailsData;
//     console.log("bookDetails: ", bookDetails);
//     const {
//       authorName,
//       coverPic,
//       aboutBook,
//       rating,
//       //readStatus,
//       aboutAuthor,
//       title,
//       id,
//     } = bookDetails;
//     console.log("bookDetails: ", authorName);
//     return (
//       <div className="book-details-card-container">
//         <div className="book-details-container">
//           <img className="book-details-image" alt={title} src={coverPic} />
//           <div className="container1">
//             <h1 className="book-title" key={title}>
//               {title}
//             </h1>
//             <p className="book-details-author-name">{authorName}</p>
//             <div className="book-details-rating-container">
//               <p className="book-details-abg-rating-heading">Avg rating</p>
//               <BsFillStarFill className="book-details-star-icon" />
//               <p className="book-details-rating">{rating}</p>
//             </div>
//             <p className="book-details-status-heading">
//               {/* Status: <span className="book-details-status">{readStatus}</span> */}
//             </p>
//             <FavoriteContext.Consumer>
//               {(value) => {
//                 const { favoriteList, onToggleFavorite } = value;
//                 const isChecked = favoriteList.find(
//                   (eachItem) => eachItem.id === id
//                 );
//                 const onChangeFavorite = () => {
//                   onToggleFavorite({
//                     id,
//                     title,
//                     ///readStatus,
//                     rating,
//                     authorName,
//                     aboutAuthor,
//                     coverPic,
//                   });
//                 };
//                 return (
//                   <>
//                     <input
//                       className="favorite-input"
//                       onChange={onChangeFavorite}
//                       id={id}
//                       type="checkBox"
//                     />
//                     <label htmlFor={id}>
//                       <div className="favorite-container">
//                         <p className="book-details-status-heading">
//                           MyFavorite
//                         </p>
//                         {isChecked ? (
//                           <BsFillHeartFill className="favorite-icon-book-details-selected" />
//                         ) : (
//                           <BsFillHeartFill className="favorite-icon-book-details" />
//                         )}
//                       </div>
//                     </label>
//                   </>
//                 );
//               }}
//             </FavoriteContext.Consumer>
//           </div>
//         </div>
//         <div className="container2">
//           <hr name="horizontal-line" />
//           <div>
//             <h1 className="about-heading">About Author</h1>
//             <p className="about-paragraph">{aboutAuthor}</p>
//           </div>
//           <div>
//             <h1 className="about-heading">About Book</h1>
//             <p className="about-paragraph">{aboutBook}</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderBookDetails = () => {
//     console.log("renderBookDetails", bookDetailsApiStatus);
//     switch (bookDetailsApiStatus) {
//       case bookDetailsApiStatuses.success:
//         return renderBookDetailsSuccessView();
//       case bookDetailsApiStatuses.inProgress:
//         return renderBookDetailsInProgressView();
//       case bookDetailsApiStatuses.failure:
//         return renderBookDetailsFailureView();
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <AppHeader />
//       <div className="book-details-bg-container">{renderBookDetails()}</div>
//       <Footer />
//     </>
//   );
// };

// export default BookItemDetails;
import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Rate,
  Divider,
  List,
  Avatar,
  Progress,
  Empty,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      });
      setBook(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!book && !loading) return <Empty />;

  return (
    <Layout>
      <Content style={{ padding: 24, maxWidth: 1200, margin: "auto" }}>
        {console.log("book detail", book)}
        {book && (
          <>
            {/* ===== HEADER ===== */}
            <Card loading={loading}>
              <Row gutter={[24, 24]} align="top">
                <Col xs={24} sm={8} md={6}>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 180,
                      margin: "0 auto",
                    }}
                  >
                    <Avatar
                      shape="square"
                      src={`http://localhost:8080${book.coverUrl}`}
                      icon={<BookOutlined />}
                      style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "3 / 4",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                  </div>
                </Col>

                <Col xs={24} sm={16} md={18}>
                  <Title level={2} style={{ marginBottom: 4 }}>
                    {book.title}
                  </Title>

                  <Text>
                    <UserOutlined /> {book.author.name} ({book.author.country})
                  </Text>

                  <br />
                  <Rate disabled allowHalf value={book.avgRating} />

                  <br />
                  <Text type="secondary">
                    Ngày tạo: {new Date(book.createdAt).toLocaleDateString()}
                  </Text>

                  <Divider />

                  {book.genres.map((g) => (
                    <Tag color="blue" key={g.genreId}>
                      {g.name}
                    </Tag>
                  ))}
                </Col>
              </Row>
            </Card>

            {/* ===== DESCRIPTION ===== */}
            <Card title="Mô tả" style={{ marginTop: 24 }}>
              <Paragraph>{book.description}</Paragraph>
            </Card>

            {/* ===== AUTHOR ===== */}
            <Card title="Tác giả" style={{ marginTop: 24 }}>
              <Paragraph>{book.author.bio}</Paragraph>
            </Card>

            {/* ===== MEDIA ===== */}
            <Card title="Tài nguyên" style={{ marginTop: 24 }}>
              <List
                dataSource={book.mediaAssets}
                locale={{
                  emptyText: <Empty description="Không có tài nguyên" />,
                }}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        item.type === "image" ? (
                          <FileImageOutlined />
                        ) : (
                          <FilePdfOutlined />
                        )
                      }
                      title={
                        <a href={item.fileUrl} target="_blank" rel="noreferrer">
                          {item.type.toUpperCase()}
                        </a>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* ===== CHAPTERS ===== */}
            <Card title="Danh sách chương" style={{ marginTop: 24 }}>
              <List
                dataSource={book.chapters}
                locale={{ emptyText: <Empty description="Chưa có chương" /> }}
                renderItem={(c) => (
                  <List.Item>
                    <List.Item.Meta
                      title={`${c.chapterOrder}. ${c.chapterTitle}`}
                      description={`⏱ ${c.duration} phút`}
                    />
                    {c.audioUrl && <audio controls src={c.audioUrl} />}
                  </List.Item>
                )}
              />
            </Card>

            {/* ===== READING PROGRESS ===== */}
            <Card title="Tiến độ đọc" style={{ marginTop: 24 }}>
              {book.readingProgresses.length === 0 ? (
                <Empty description="Chưa có tiến độ" />
              ) : (
                book.readingProgresses.map((p) => (
                  <div key={p.progressId} style={{ marginBottom: 16 }}>
                    <Text>
                      {p.userId == Cookies.get("user_id")
                        ? "Bạn"
                        : "User " + p.userName}
                    </Text>
                    <Progress percent={p.percentDone} />
                  </div>
                ))
              )}
            </Card>

            {/* ===== REVIEWS ===== */}
            <Card title="Đánh giá" style={{ marginTop: 24 }}>
              {book.bookReviews.length === 0 ? (
                <Empty description="Chưa có đánh giá" />
              ) : (
                "TODO"
              )}
            </Card>

            {/* ===== HIGHLIGHTS ===== */}
            <Card title="Highlights" style={{ marginTop: 24 }}>
              {book.highlights.length === 0 ? (
                <Empty description="Chưa có highlight" />
              ) : (
                "TODO"
              )}
            </Card>

            {/* ===== QUOTES ===== */}
            <Card title="Quotes" style={{ marginTop: 24 }}>
              {book.quotes.length === 0 ? (
                <Empty description="Chưa có quote" />
              ) : (
                "TODO"
              )}
            </Card>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default BookDetail;
