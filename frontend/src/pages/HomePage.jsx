import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);

  // state for new name

  const [name, setName] = useState("");


  return (
    <div className="bg-[#F7F4ED]">
      <Navbar />
      <h1>HomePage</h1>

      <h3 className="font-semibold">User's Username : {currentUser?.username}</h3>

      <h2>User's Email: {currentUser?.email}</h2>

      <input
        className="border-black border-1 p-2"
        type="text"
        placeholder="Enter new name"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="bg-black p-1 text-white text-sm cursor-pointer"
     
      >
        Change Name
      </button>
    </div>
  );
};

export default HomePage;
