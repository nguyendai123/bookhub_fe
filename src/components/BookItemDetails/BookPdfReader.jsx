// import { Document, Page, pdfjs } from "react-pdf"; // Thêm pdfjs vào đây
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Button, Space, Spin } from "antd";

// // Cấu hình Worker để không bị lỗi "No GlobalWorkerOptions.workerSrc"
// // Sử dụng template string để tự động khớp phiên bản, tránh lỗi version mismatch
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// // Import CSS để hiển thị nội dung PDF chính xác (không thể thiếu)
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import BookReaderView from "../BookReaderView/BookReaderView";

// const BookPdfReader = ({ bookId, chapterId }) => {
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/books/${bookId}/pdf`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("jwt_token")}`,
//         },
//       })
//       .then((res) => {
//         setPdfUrl(`http://localhost:8080${res.data.pdfUrl}`);
//         console.log("res pdf", res.data);
//         setTotalPages(res.data.totalPages);
//         setPage(res?.data?.currenPage);
//         // Nếu server có trả về trang đang đọc dở, bạn có thể setPage(res.data.currentPage) tại đây
//       })
//       .catch((err) => console.error("Lỗi tải tệp PDF:", err));
//   }, [bookId]);

//   const saveProgress = (p) => {
//     axios.post(
//       "http://localhost:8080/api/reading/update",
//       { bookId, currentPage: p },
//       {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("jwt_token")}`,
//         },
//       }
//     );
//   };

//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       {pdfUrl && (
//         <>
//           <BookReaderView bookId={bookId} chapterId={chapterId} />

//           <Document
//             file={pdfUrl}
//             loading={<Spin tip="Đang tải PDF..." />}
//             onLoadError={(error) =>
//               console.error("Lỗi render tài liệu:", error)
//             }
//           >
//             <Page
//               pageNumber={page}
//               width={600}
//               renderTextLayer={true}
//               renderAnnotationLayer={true}
//             />
//           </Document>

//           <div style={{ marginTop: 8 }}>
//             Trang {page} / {totalPages}
//           </div>

//           <Space style={{ marginTop: 12 }}>
//             <Button
//               disabled={page <= 1}
//               onClick={() => {
//                 const prevPage = page - 1;
//                 setPage(prevPage);
//                 saveProgress(prevPage);
//               }}
//             >
//               Trang trước
//             </Button>

//             <Button
//               disabled={page >= totalPages}
//               onClick={() => {
//                 const nextPage = page + 1;
//                 setPage(nextPage);
//                 saveProgress(nextPage);
//               }}
//             >
//               Trang sau
//             </Button>
//           </Space>
//         </>
//       )}
//     </div>
//   );
// };

// export default BookPdfReader;

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import { Tooltip, Spin, Switch, Space, Button } from "antd";
import { getHighlights, createHighlight } from "../../services/AskAI";
import HighlightLayer from "../HighlightLayer/HighlightLayer";
import { captureHighlight } from "../../hooks/captureHighlight";
import axios from "axios";
import Cookies from "js-cookie";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

const BookPdfReader = ({ bookId, chapterId }) => {
  const [pdfUrl, setPdfUrl] = useState();
  const [page, setPage] = useState(1);
  const [highlights, setHighlights] = useState([]);
  const [showAI, setShowAI] = useState(true);
  const [showUser, setShowUser] = useState(true);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (bookId) {
      fetchPdf();
    }
    loadHighlights();
  }, [bookId]);
  const saveProgress = (p) => {
    axios.post(
      "http://localhost:8080/api/reading/update",
      { bookId, currentPage: p },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      }
    );
  };
  const fetchPdf = async () => {
    axios
      .get(`http://localhost:8080/api/books/${bookId}/pdf`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      })
      .then((res) => {
        setPdfUrl(`http://localhost:8080${res.data.pdfUrl}`);
        console.log("res pdf", res.data);
        setTotalPages(res.data.totalPages);
        setPage(res?.data?.currenPage);
        // Nếu server có trả về trang đang đọc dở, bạn có thể setPage(res.data.currentPage) tại đây
      })
      .catch((err) => console.error("Lỗi tải tệp PDF:", err));
  };

  const loadHighlights = async () => {
    const res = await getHighlights(bookId);
    setHighlights(res.data);
  };

  const filteredHighlights = highlights.filter(
    (h) => (h.source === "AI" && showAI) || (h.source === "USER" && showUser)
  );
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    requestAnimationFrame(async () => {
      const highlightPayload = captureHighlight(selection, page);
      if (!highlightPayload) return;

      await createHighlight({
        bookId,
        chapterId,
        text: highlightPayload.text,
        pageNumber: highlightPayload.pageNumber,
        position: JSON.stringify(highlightPayload.rects),
        source: "USER",
      });

      selection.removeAllRanges();
      loadHighlights();
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div onMouseUp={handleMouseUp}>
          <Document file={pdfUrl} loading={<Spin />}>
            <div style={{ position: "relative" }}>
              <div className="pdf-page-wrapper">
                <div className="highlight-toolbar">
                  <Tooltip title="User Highlight">
                    <Switch
                      checked={showUser}
                      onChange={setShowUser}
                      checkedChildren={<UserOutlined />}
                      unCheckedChildren={<UserOutlined />}
                    />
                  </Tooltip>

                  <Tooltip title="AI Highlight">
                    <Switch
                      checked={showAI}
                      onChange={setShowAI}
                      checkedChildren={<RobotOutlined />}
                      unCheckedChildren={<RobotOutlined />}
                    />
                  </Tooltip>
                </div>
                <Page pageNumber={page} width={700} />
                <HighlightLayer page={page} highlights={filteredHighlights} />
              </div>
            </div>
          </Document>
        </div>
        <div style={{ marginTop: 8 }}>
          Trang {page} / {totalPages}
        </div>

        <Space style={{ marginTop: 12 }}>
          <Button
            disabled={page <= 1}
            onClick={() => {
              const prevPage = page - 1;
              setPage(prevPage);
              saveProgress(prevPage);
            }}
          >
            Trang trước
          </Button>

          <Button
            disabled={page >= totalPages}
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              saveProgress(nextPage);
            }}
          >
            Trang sau
          </Button>
        </Space>
      </div>
    </>
  );
};

export default BookPdfReader;
