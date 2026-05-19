import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
const handleLogin = async () => {

  const userData = {
    email: email,
    password: password,
  };

  try {

    const response = await axios.post(
      "http://localhost:8080/login",
      userData
    );
if(response.data=="User Not Found"){
alert("Invalid user");
}else{
    localStorage.setItem("token", response.data);
}
navigate("/dashboard");

  } catch (error) {

    console.log(error);

    alert("Login Failed");

  }

};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>

      <Navbar title="TaskFlow App" />

      <div className="login-container">

        <div className="login-box">

          <h1>Login</h1>

          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         <button onClick={handleLogin}>
  Login
</button>
          <p>
            Don't have an account?
           <Link to="/register"> Register</Link>
          </p>

          {/*
<p>Email: {email}</p>
<p>Password: {password}</p>
*/}

        </div>

      </div>

    </div>
  );
}

export default Login;