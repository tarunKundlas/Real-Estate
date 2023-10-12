import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Oauth from "../component/Oauth.jsx";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [laoding, setLoading] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        formData
      );
      const data = await response.data;
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
      console.log("Signup Successful", response.data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error("Signup Failed", error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          className="border p-3 rounded-lg "
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          onChange={handleChange}
          className="border p-3 rounded-lg "
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3 rounded-lg "
          id="password"
        />
        <button
          disable={laoding}
          className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {laoding ? "Loading..." : "Sign Up"}
        </button>
        <Oauth />
      </form>

      <div className="flex flex-wrap justify-between mx-2 mt-2">
        <p>Have an account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
        <div>{error && <p className="text-red-500 mt-5">{error}</p>}</div>
      </div>
    </div>
  );
}

export default SignUp;
