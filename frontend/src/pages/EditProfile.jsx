import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { userUpdateSuccessful } from "../redux/user/userSlice";

const EditProfile = () => {
  // dispatch

  const dispatch = useDispatch();

  // // accessing currentUser from redux store
  const { currentUser } = useSelector((state) => state.user);

  // state for new name

  const [username, setUsername] = useState("");

  console.log(username);

  // handle input change

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // console.log(currentUser)

  // api function to change username

  const changeUsername = async () => {
    try {
      if (!username) {
        return alert("Please provide a username first");
      }

      const response = await axios.patch(
        "http://localhost:5000/user/editusername",
        {
          username,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.userDetails) {
        dispatch(userUpdateSuccessful(response.data.userDetails));
      }

      console.log(response.data);
    } catch (err) {
      console.log("Error making api call to change username", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-semibold">EditProfile</h1>

      <br />

      <h3 className="text-2xl font-semibold">
        User's username : {currentUser?.username}
      </h3>
      <h3 className="text-2xl font-semibold">
        User's email : {currentUser?.email}
      </h3>

      <input
        className="p-2 mt-4 border-none"
        type="text"
        placeholder="Enter new username"
        onChange={handleUsernameChange}
      />

      <button
        onClick={changeUsername}
        className="bg-slate-900 py-2 px-6 mt-4 cursor-pointer text-white font-semibold rounded-2xl"
      >
        Change username
      </button>
    </div>
  );
};

export default EditProfile;
