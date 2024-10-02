import { useState } from "react";
import axios from "axios";

export default function UserLogin() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('attemptign to submit the fomr.')
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
      console.log("successfully logged in the user", response.data.message);
    } catch (err) {
    //   console.log('printing error:💥',err.flx);
    console.log('printing error:💥', err.response ? err.response.data : err.message);
    }
    setFormData({
      name: "",
      password: "",
    });
  }
  function formInputHandler(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div>
      Login Form
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
        required
          name="name"
          id="name"
          value={formData.name}
          onChange={formInputHandler}
          type="text"
        ></input>

        <label htmlFor="pwd">password</label>
        <input
        required    // 
          id="pwd"
          name="password"
          value={formData.password}
          onChange={(e) => formInputHandler(e)}
          type="password"
        ></input>
        <input type="submit" />
      </form>
    </div>
  );
}
