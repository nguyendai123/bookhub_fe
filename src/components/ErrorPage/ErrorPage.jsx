import { useRouteError, useNavigate } from "react-router-dom";
import { Button, Space } from "antd";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate("/");
  };
  const pageStyle = {
    margin: "0 auto",
    width: "300px",
    height: "100%",
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const imageStyle = {
    width: "300px",
    height: "300px",
  };
  const paragraphStyle = {
    textAlign: "center",
  };
  return (
    <Space style={pageStyle}>
      <h1>Oops!</h1>
      <p style={paragraphStyle}>
        Sorry, the page you are looking for might have been removed or
        temporarily unavailable.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button type="primary" onClick={goToHomepage}>
        Go to Homepage
      </Button>
    </Space>
  );
};

export default ErrorPage;
