import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
function App() {
  
  return (
    <div className="parent">
      <h1>
      app
      </h1>
      <UserSignup key={'userSignup'} />
      <UserLogin key={'userLogin'} />
    </div>
  );
}

export default App;
