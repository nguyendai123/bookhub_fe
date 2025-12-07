import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Image } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const Books = () => {
  const [books, setbooks] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const jwtToken = Cookies.get("jwt_token");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/books/search?keyword=", { headers })
      .then((response) => response.json())
      .then((data) => {
        setbooks(data);
        if (reloadData) {
          setReloadData(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reloadData]);
  console.log("books", books);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newbook, setNewbook] = useState({
    id: "",
    name: "",
    image: "",
    author: "",
    isbn: "",
    summary: "",
    averageRating: "",
    page: "",
  });
  const [editingbook, setEditingbook] = useState(null);

  const columns = [
    {
      title: "Tên sách",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image width={180} height={270} alt={image} src={image} />
      ),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Tóm tắt",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "Trang",
      dataIndex: "page",
      key: "page",
    },
    // {
    //   title: "Hành động",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_, record) => (
    //     <div>
    //       <Button type="primary" onClick={() => editbook(record)}>
    //         Sửa đổi
    //       </Button>
    //       <Button type="danger" onClick={() => cancelbook(record)}>
    //         Hủy bỏ
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    console.log("new book", newbook.name);
    if (1) {
      const formData = {
        title: newbook.name,
        image: imageFile,
        author: newbook.author,
        isbn: newbook.isbn,
        summary: newbook.summary,
        page: newbook.page,
      };
      console.log("formData", formData);
      if (editingbook) {
        const bookId = editingbook.bookID;
        const urlBook = `http://localhost:8080/api/books/${bookId}`;

        const response = await axios.put(urlBook, formData);
        const data = response.data;
        const updatedbooks = books.map((item) => {
          if (item.id === bookId) {
            return data;
          }
          return item;
        });
        console.log("books dai api progress", data);
        setbooks(updatedbooks);
        setEditingbook(null);

        setReloadData(true);
      } else {
        const url = "http://localhost:8080/api/admin/books";
        const response1 = await axios.post(url, formData);
        const data1 = response1.data;
        console.log("books dai api progress", data1);
        setbooks((prevbooks) => [...prevbooks, data1]);
      }

      setIsModalVisible(false);
      setNewbook({
        name: "",
        image: "",
        author: "",
        isbn: "",
        summary: "",
        page: "",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewbook({
      name: "",
      image: "",
      author: "",
      isbn: "",
      summary: "",
      page: "",
    });
    setEditingbook(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewbook((prevbook) => ({
      ...prevbook,
      [name]: value,
    }));
  };

  const [imageFile, setImageFile] = useState();

  const handleFileChange = async (e) => {
    const file = await convertBase64(e.target.files[0]);

    console.log(file, "File ở đây???");
    setImageFile(file);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const editbook = (book) => {
    // console.log(book,"Có gì ở đây ?")
    // console.log(book.image,"Có image ở đây không?")
    setIsModalVisible(true);
    setNewbook({
      id: book.id,
      name: book.title,
      imageFile: book.image,
      author: book.author,
      isbn: book.isbn,
      summary: book.summary,
      page: book.page,
    });
    // eslint-disable-next-line no-undef
    setEditingbook(book);
    // setEditingImageFile(book.image);
  };

  const cancelbook = (book) => {
    fetch(`http://localhost:8080/api/books/${book.bookID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setbooks((prevbooks) => prevbooks.filter((item) => item !== book));
        } else {
          console.error("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm sách
      </Button>
      <Table
        dataSource={books.map((item, idx) => ({ ...item, key: idx }))}
        columns={columns}
      />

      <Modal
        title="Thêm sách"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Tên sách">
            <Input
              name="name"
              value={newbook.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Ảnh">
            <Input name="imageFile" type="file" onChange={handleFileChange} />
            <br />
            <Image width={180} height={270} src={imageFile} />
          </Form.Item>
          <Form.Item label="Tác giả">
            <Input
              name="author"
              value={newbook.author}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="ISBN">
            <Input
              name="isbn"
              value={newbook.isbn}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Tóm tắt">
            <Input
              name="summary"
              value={newbook.summary}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Số trang">
            <Input
              name="page"
              value={newbook.page}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Books;
