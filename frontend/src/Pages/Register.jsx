import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {

       const response = await axios.post(
          "http://localhost:8080/register",
          userData
        );
    

      console.log(response.data);

      alert(response.data);
      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Error");

    }

  };

  return (
    <div>

      <Navbar title="Register Page" />

      <div className="login-container">

        <div className="login-box">

          <h1>Register</h1>

          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleRegister}>
            Register
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;