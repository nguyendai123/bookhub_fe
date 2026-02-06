import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import AppHeader from "../Header/Header";

import Footer from "../Footer/Footer";
import BookItem from "../BookItem/BookItem";

import "./BookShelves.css";
import { useEffect, useState } from "react";
import { Button, Input, Space, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const bookshelvesList = [
  { value: "ALL", label: "Tất cả" },
  { value: "FINISHED", label: "Đã đọc" },
  { value: "READING", label: "Đang đọc" },
  { value: "WANT_TO_READ", label: "Muốn đọc" },
];

const STATUS = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  LOADING: "LOADING",
};

const BookShelves = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [allBooksRaw, setAllBooksRaw] = useState([]); // cache ALL
  const [myShelfRaw, setMyShelfRaw] = useState([]); // cache reading

  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState(STATUS.LOADING);

  const [loadedAll, setLoadedAll] = useState(false);
  const [loadedShelf, setLoadedShelf] = useState(false);

  const [booksData, setBooksData] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeFilterLabel, setActiveFilterLabel] = useState(
    bookshelvesList[0].label,
  );

  const [page, setPage] = useState(1); // antd bắt đầu từ 1
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);

  const jwtToken = Cookies.get("jwt_token");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    getBooksApiData();
  }, [page, pageSize]);

  const getBooksApiData = async () => {
    setStatus(STATUS.LOADING);
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/books/search?keyword=",
        { headers },
      );

      setAllBooksRaw(data.content);
      setTotal(data.totalElements);
      setLoadedAll(true);
      setStatus(STATUS.SUCCESS);
    } catch (e) {
      setStatus(STATUS.FAILURE);
    }
  };

  const getMyBookshelfList = async () => {
    setStatus(STATUS.LOADING);
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/reading",
        {
          headers,
        },
      );

      setMyShelfRaw(data);
      setLoadedShelf(true);
      setStatus(STATUS.SUCCESS);
    } catch (e) {
      setStatus(STATUS.FAILURE);
    }
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    if (activeFilter === "ALL") return;

    const filtered = myShelfRaw.filter((b) => b.readingStatus === activeFilter);

    setBooks(
      filtered.map((b) => ({
        id: b.bookId,
        title: b.title,
        authorName: b.author?.name,
        coverPic: b.coverUrl,
        avgRating: b.avgRating,
        totalReviews: b.totalReviews,
        totalPages: b.totalPages,
        readStatus: b.readingStatus,
        percentDone: b.percentDone,
        currentPage: b.currentPage,
        genres: b?.genres,
      })),
    );
  }, [activeFilter, myShelfRaw]);

  useEffect(() => {
    setPage(1);
    if (activeFilter === "ALL") {
      if (!loadedAll) {
        getBooksApiData();
      }
      return;
    }

    if (!loadedShelf) {
      getMyBookshelfList();
    }
  }, [activeFilter]);

  useEffect(() => {
    if (activeFilter === "ALL") {
      setBooks(
        allBooksRaw.map((book) => ({
          id: book.bookId,
          title: book.title,
          authorName: book.authorName,
          coverPic: book.coverUrl,
          avgRating: book.avgRating,
          totalReviews: book.totalReviews,
          totalPages: book.totalPages,
          readStatus: book.readingStatus,
          percentDone: book.percentDone,
          currentPage: book.currentPage,
          genres: book.genres,
        })),
      );
      return;
    }

    const filtered = myShelfRaw.filter((b) => b.readingStatus === activeFilter);

    setBooks(
      filtered.map((b) => ({
        id: b.bookId,
        title: b.title,
        authorName: b.authorName,
        coverPic: b.coverUrl,
        avgRating: b.avgRating,
        totalReviews: b.totalReviews,
        totalPages: b.totalPages,
        readStatus: b.readingStatus,
        percentDone: b.percentDone,
        currentPage: b.currentPage,
        genres: b?.genres,
      })),
    );
  }, [activeFilter, allBooksRaw, myShelfRaw]);

  /* ================= RENDER ================= */
  const renderContent = () => {
    if (status === STATUS.LOADING) {
      return (
        <div className="loader-container">
          <TailSpin height={50} width={50} />
        </div>
      );
    }

    if (status === STATUS.FAILURE) {
      return <p style={{ textAlign: "center" }}>Load dữ liệu thất bại</p>;
    }

    if (filteredBooks.length === 0) {
      return <p style={{ textAlign: "center" }}>Không có sách</p>;
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const pagedBooks = filteredBooks.slice(startIndex, endIndex);
    console.log(
      "startIndex",
      startIndex,
      "endIndex",
      endIndex,
      "pagedBooks",
      pagedBooks,
    );

    return (
      <>
        <ul className="bookList-container">
          {console.log("filteredBooks", filteredBooks)}
          {pagedBooks.map((b) => (
            <BookItem key={b.id} bookDetails={b} />
          ))}
        </ul>

        {activeFilter === "ALL" && (
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            onChange={(p, s) => {
              setPage(p);
              setPageSize(s);
            }}
            style={{ marginTop: 24, textAlign: "center" }}
          />
        )}
      </>
    );
  };
  const RenderBooksProgressView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin color="#8284C7" height={50} width={50} />;
    </div>
  );

  const RenderBooksFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />
      <p className="top-rated-books-failure-heading">
        Something went wrong. Please try Again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={() => onClickRetry()}
        type="button"
      >
        Try Again
      </button>
    </div>
  );

  const removeVietnameseTones = (str = "") =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  const filteredBooks = (books || []).filter((book) => {
    const keyword = removeVietnameseTones(searchKeyword);

    const matchSearch =
      !keyword ||
      removeVietnameseTones(book.title).includes(keyword) ||
      removeVietnameseTones(book.authorName || "").includes(keyword);
    console.log("book shelf book", book);
    const matchShelf =
      !activeFilter ||
      activeFilter === "ALL" ||
      book?.readStatus === activeFilter;
    console.log("book shelf matchShelf", book);

    return matchSearch && matchShelf;
  });

  const renderTheListOfBooks = () => {
    return (
      <ul className="bookList-container">
        {filteredBooks.map((eachBook) => (
          <BookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          showQuickJumper
          onChange={(p, size) => {
            setPage(p);
            setPageSize(size);
          }}
          style={{ marginTop: 24, textAlign: "center" }}
        />
      </ul>
    );
  };

  const renderNoMatchBooks = () => {
    return (
      <div className="no-match-found-container">
        <img
          className="no-match-image"
          src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
          alt="no books"
        />
        <p className="no-match-paragraph">
          Your search for {searchKeyword} did not find any matches.
        </p>
      </div>
    );
  };

  const RenderBooksSuccessView = () => {
    if (filteredBooks.length > 0) {
      return renderTheListOfBooks();
    }
    return renderNoMatchBooks();
  };
  const headingMap = {
    "Tất cả": "Tất cả sách",
    "Đã đọc": "Sách đã đọc",
    "Đang đọc": "Sách đang đọc",
    "Muốn đọc": "Sách muốn đọc",
  };
  return (
    <>
      <AppHeader />
      <div>
        <div className="book-shelves-bg-container-lg">
          <div className="book-shelves-filter-container">
            <h1
              className="bookshelves-heading-bookshelves-heading-lg"
              key="title"
            >
              Kệ sách của tôi
            </h1>
            <ul className="filter-un-order-list-container">
              {bookshelvesList.map((eachItem) => {
                const activeFilterClass =
                  activeFilter === eachItem.value ? "active-filter-lg" : "";
                const onClickedFilter = () => {
                  setActiveFilter(eachItem.value);
                  setActiveFilterLabel(eachItem.label);
                  setPage(1);
                };
                return (
                  <li className="active-filter-list-lg" key={eachItem.label}>
                    <button
                      className={`active-filter-list-lg ${activeFilterClass}`}
                      onClick={onClickedFilter}
                      type="button"
                    >
                      {eachItem.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="large-container">
            <div className="filtered-books-search-input-container-lg">
              <h1 className="filtered-books-heading">
                {headingMap[activeFilterLabel] || "Sách"}
              </h1>

              <div className="search-input-container">
                <Input
                  allowClear
                  size="large"
                  placeholder="Tìm theo tên sách hoặc tác giả..."
                  prefix={<SearchOutlined />}
                  value={searchKeyword}
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
            <div className="renderbookshelves"> {renderContent()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookShelves;
