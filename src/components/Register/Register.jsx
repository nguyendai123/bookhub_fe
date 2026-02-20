import bg from "../../assets/bg-login.svg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import "./Register.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const onSubmitSuccuss = () => {
    navigate("/login"); // hoặc navigate("/") tùy bạn
  };

  const onSubmitFailure = (msg) => {
    setShowSubmitError(true);
    setErrorMsg(msg || "Register failed!");
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleCancelClick = () => {
    return navigate("/");
  };

  // -------------------------
  // 🔥 GỌI API ĐĂNG KÝ Ở ĐÂY
  // -------------------------
  const onSubmitForm = async (event) => {
    event.preventDefault();

    const apiUrl = "/api/auth/register";

    const bodyData = {
      username: username,
      email: email,
      role: ["USER"],
      password: password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      console.log("Register response: ", data);

      if (response.ok) {
        onSubmitSuccuss();
      } else {
        onSubmitFailure(data.message || "Registration failed");
      }
    } catch (error) {
      onSubmitFailure("Cannot connect to server");
    }
  };
  return (
    <div className="register-page">
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="register-form-container"
      >
        <div className="left-content-register">
          <img
            src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645077666/book-hub-logo_dy4szt.png"
            alt="website logo"
            className="register-website-logo-desktop-image"
          />
          <div className="bookhub-des-lregister">
            BookHub helps people share books, join discussions, discover new
            books, and connect with readers.
          </div>
        </div>

        <div className="form-main-container">
          <form className="form-container-register" onSubmit={onSubmitForm}>
            <div>Sign Up</div>
            <div className="input-container">
              <>
                <label className="input-label" htmlFor="username">
                  Username
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  className="input-field"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => onChangeUsername(e)}
                />
              </>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </div>
            <div className="input-container">
              <>
                <label className="input-label" htmlFor="password">
                  Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => onChangePassword(e)}
                />
              </>
            </div>
            <div className="input-container">
              <>
                <label className="input-label" htmlFor="password">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  className="input-field"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => onChangeEmail(e)}
                />
              </>
            </div>
            <div className="Signup-btn">
              <button className="register-button" onClick={handleCancelClick}>
                Cancel
              </button>
              <button className="register-button">Register</button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer-register">
        <div className="tran-register">
          <div>English (UK)</div>
          <div>Tiếng Việt</div>
        </div>
        <div>Copyright @ 2025</div>
      </div>
    </div>
  );
};
export default Register;
