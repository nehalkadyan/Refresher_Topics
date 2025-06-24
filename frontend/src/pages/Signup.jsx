import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const Signup = () => {

  const navigate = useNavigate()

  // state for formData

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log("formData:", formData);

  // function to track formData changes
  const handleFormDataChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // function to handle signup

  const signup = async(event) => {

      event.preventDefault()

     try{
       // api call
       const response = await axios.post("http://localhost:5000/auth/signup", formData)
       console.log(response.data)

       if(response.data.newUser){
        navigate("/signin")
       }
     }catch(err){
        console.log("Error signing up!", err)
     }
  }

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <div>
        <h1 className="font-semibold text-3xl mb-6">Signup Page</h1>
      </div>

      <form onSubmit={signup} className="flex flex-col border-2 gap-4 border-gray-500 p-10 rounded-lg">
        <input
          name="username"
          className="outline-none border-2 border-black p-2 rounded-lg"
          type="text"
          placeholder="Enter username"
          onChange={handleFormDataChange}
        />
        <input
          name="email"
          className="outline-none border-2 border-black p-2 rounded-lg"
          type="email"
          placeholder="Enter email"
          onChange={handleFormDataChange}
        />
        <input
          name="password"
          className="outline-none border-2 border-black p-2 rounded-lg"
          type="password"
          placeholder="Enter password"
          onChange={handleFormDataChange}
        />

        <button type="submit" className="bg-slate-800 text-white rounded-lg py-1 cursor-pointer">
          Sign up!
        </button>
      </form>
    </div>
  );
};

export default Signup;
