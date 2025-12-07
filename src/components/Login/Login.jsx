import bg from "../../assets/bg-login.svg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Redirect nếu đã login
  useEffect(() => {
    const jwt = Cookies.get("jwt_token");
    const role = Cookies.get("user_roles");

    if (jwt) {
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const onSubmitSuccess = () => {
    const role = Cookies.get("user_roles");
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const onSubmitFailure = () => {
    setShowSubmitError(true);
    setErrorMsg("Username or Password is invalid");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const userDetails = { username, password };
    const apiUrl = "http://localhost:8080/api/auth/login";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, // ❗Không cần Authorization khi login
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    console.log("data login", data);

    if (response.ok) {
      Cookies.set("jwt_token", data.token, { expires: 30, path: "/" });
      Cookies.set("user_id", data.userId, { expires: 30, path: "/" });
      Cookies.set("user_roles", data.roles, { expires: 30, path: "/" });

      localStorage.setItem("data_avatar", data.avatar);

      onSubmitSuccess();
    } else {
      onSubmitFailure();
    }
  };

  return (
    <div className="login-page">
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="login-form-container"
      >
        <div className="left-content-login">
          <img
            src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645077666/book-hub-logo_dy4szt.png"
            alt="website logo"
            className="login-website-logo-desktop-image"
          />
          <div className="bookhub-des-login">
            BookHub helps people share books, join discussions, discover new
            books, and connect with readers.
          </div>
        </div>

        <div className="form-main-container">
          <form className="form-container" onSubmit={onSubmitForm}>
            <div className="input-container">
              <label className="input-label" htmlFor="username">
                Username <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="password">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

            <a href="#" className="forgot-pw">
              Forgot password
            </a>

            <div className="space-login"></div>

            <button
              className="register-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="footer-login">
        <div className="tran-login">
          <div>English (UK)</div>
          <div>Tiếng Việt</div>
        </div>
        <div>Copyright @ 2023 by F1</div>
      </div>
    </div>
  );
};

export default Login;
