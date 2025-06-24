import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductCard from "./components/ProductCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import EditProfile from "./pages/EditProfile";
import Signup from "./pages/Signup";
import axios from "axios";
import SignIn from "./pages/Signin";

function App() {
  // const [name, setName] = useState("xyz");

  // console.log("name", name);

  // // function to modify name

  // const modifyName = () => {
  //   setName("pqr");
  // }

  // create state for count

  // const [count, setCount] = useState(0)

  // functions to increment and decrement

  // function increment(){
  //   setCount(count + 1);
  // }

  // function decrement(){
  //   setCount(count - 1);
  // }

  // create state for users

  const [users, setUsers] = useState([]);

  const [fileterdUsers, setFilteredUsers] = useState([]);

  // state for searchTerm

  const [searchTerm, setSearchTerm] = useState("");

  console.log("searchTerm", searchTerm);

  console.log("users:", users);

  // function to fetch users
  const fetchUsers = async () => {
    const response = await axios("https://jsonplaceholder.typicode.com/users");
    // const data = await response.json();

    console.log("fetched Data", response);
    setUsers(response.data);
    setFilteredUsers(response.data);
  };

  // useEffect -> on load ,fetchUsers will be called
  useEffect(() => {
    fetchUsers();
  }, []);

  // search functionality

  function searchUsers() {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
      return;
    }
    const fileterdusers = fileterdUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(fileterdusers);
  }

  useEffect(() => {
    searchUsers();
  }, [searchTerm]);

  return (
    <>
      <Router>
      <Routes>
         <Route path="/" element = {<Home />}/>
         <Route path = "/edit" element={<EditProfile />}/>
         <Route path= "/signup" element = {<Signup />}/>
         <Route path= "/signin" element = {<SignIn />}/>

          
      </Routes>
    </Router>
      {/* <h1 className="text-red-400">Learning Hooks in React!</h1> */}
      {/* <h4>Name : {name}</h4>
       <button onClick={modifyName}>Change Name</button> */}

      {/* <button onClick={increment}>+</button>
         <span>{count}</span>
       <button onClick={decrement}>-</button> */}

      {/* search bar */}

      {/* <div className="text-center">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="test-md border-2 border-gray-700 text-gray-500"
          type="text"
          placeholder="search user..."
        />
      </div>

      <h2>Users List:</h2>

      <div className="flex flex-wrap justify-around gap-4 items-center">
        {fileterdUsers?.map((user, id) => (
          <ProductCard key={id} user={user} />
        ))}
      </div> */}
    </>
  );
}

export default App;
