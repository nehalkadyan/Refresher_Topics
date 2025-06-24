import React, { useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { loginSuccessful } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  // dispatch

  const dispatch = useDispatch();

  // navigate 

  const navigate = useNavigate()

  // access currentUser

  const {currentUser} = useSelector((state) => state.user);

  console.log(currentUser)

  // state for formData

  const [formData, setFormData] = useState({
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

  const signin = async(event) => {

      event.preventDefault()

     try{
       // api call
       const response = await axios.post("http://localhost:5000/auth/signin", formData,
        {withCredentials: true}
       )

       dispatch(loginSuccessful(response.data.user))

       navigate("/")
      //  console.log(response.data)
     }catch(err){
        console.log("Error signing in!", err)
     }
  }

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <div>
        <h1 className="font-semibold text-3xl mb-6">Sign In Page</h1>
      </div>

      <h1>Login Successful : {currentUser?.username}</h1>

      <form onSubmit={signin} className="flex flex-col border-2 gap-4 border-gray-500 p-10 rounded-lg">
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
          Sign In!
        </button>
      </form>
    </div>
  );
};

export default SignIn;
