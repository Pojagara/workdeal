import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

function LoginPage(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  function login() {
    if (email.trim() !== "" && password.trim() !== "") {
      // Perform your login logic here, such as sending a request to your backend API
      axios
        .post("YOUR_LOGIN_API_ENDPOINT", {
          email: email,
          password: password,
        })
        .then((response) => {
          // Handle successful login response
          console.log("Login successful");
          props.login(false);
        })
        .catch((error) => {
          // Handle login error
          console.error("Login failed:", error);
          window.alert("Login failed. Please try again.");
        });
    } else {
      window.alert("Please enter email and password.");
    }
  }

  return (
    <div className="login-form">
      <h3>Log In</h3>
      <span>
        New Member?{" "}
        <Link href="#">
          <a onClick={() => { props.signup(true); props.login(false); }}>SignUp here</a>
        </Link>
      </span>
      <form autoComplete="off">
        <label htmlFor="email">
          Email*
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            placeholder="Your Email Here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password*
          <i
            onClick={togglePasswordVisibility}
            className={!passwordVisible ? "bi bi-eye-slash" : "bi bi-eye-slash bi-eye"}
            id="togglePassword"
          />
          <input
            autoComplete="new-password"
            type={passwordVisible ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Type Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input
          type="button"
          name="submit"
          value="LogIn"
          onClick={login}
        />
      </form>
      <p>
        By clicking the "Log In" button, you create a WorkDeal account, and you
        agree to WorkDeal's{" "}
        <a onClick={() => setShowDialog(true)}>Terms &amp; Conditions</a>
      </p>
    </div>
  );
}

export default LoginPage;
