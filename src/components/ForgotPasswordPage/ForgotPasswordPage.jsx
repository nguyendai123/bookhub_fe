import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";

const ForgotPasswordPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier) {
      setErrorMessage("Please enter a valid username or email address.");
      return;
    }

    axios
      .post("http://localhost:8080/api/auth/reset-password", {
        usernameOrEmail: identifier,
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setIsSubmitted(true);
          setSuccessMessage(data.message);
          setErrorMessage("");
        } else {
          setIsSubmitted(true);
          setSuccessMessage("");
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        setIsSubmitted(true);
        setSuccessMessage("");
        setErrorMessage("An error occurred. Please try again later.");
        console.error("Error:", error);
      });
  };

  const formStyle = {
    maxWidth: "600px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 20,
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
  };

  const submitButton = { width: "100%" };
  const backButton = { width: "100%" };

  return (
    <Form onSubmit={handleSubmit} style={formStyle}>
      <Form.Item>
        <h2>FORGOT PASSWORD</h2>
      </Form.Item>
      <Form.Item>
        Enter your email or username and we will send you a link to reset your
        password.
      </Form.Item>
      <Form.Item name="usernameOrEmail">
        <Input
          id="usernameOrEmail"
          value={identifier}
          onChange={handleIdentifierChange}
          required
          prefix={<Icon icon="ic:outline-email" />}
          placeholder="Email or Username"
        />
      </Form.Item>
      <Form.Item style={{ margin: 0 }}>
        <Button type="primary" htmlType="submit" style={submitButton}>
          Submit
        </Button>
        <Button type="text" style={backButton}>
          <Link to="/login">
            <LeftOutlined /> Back to Login
          </Link>
        </Button>
      </Form.Item>
      {isSubmitted && successMessage && <p>{successMessage}</p>}
      {isSubmitted && errorMessage && <p>{errorMessage}</p>}
    </Form>
  );
};

export default ForgotPasswordPage;
