// File: client/src/components/Dashboard/Header.jsx

import axios from "axios";
import React, { useEffect, useState } from "react"; // ⬅️ Added useEffect + useState
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(""); // ⬅️ New: state to store email

  // 🔁 Fetch user details (email) on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/users/userDetails", {
          withCredentials: true,
        });
        setUserEmail(res.data?.user?.email || ""); // ⬅️ Update if needed
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      alert(res.data.message || "Logged out");
      localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <div className="flex px-12 py-4 items-center justify-between border-b bg-white shadow-sm">
      <h1 className="text-2xl text-blue-800 font-semibold">Taskify</h1>
      
      <div className="flex gap-8 items-center">
        {/* 👤 Show user email */}
        <span className="text-sm text-gray-600 font-medium">{userEmail}</span>

        {/* ➕ Add Task */}
        <button className="hover:text-blue-800" onClick={() => setAddTaskDiv(true)}>Add Task</button>

        {/* 🔒 Logout */}
        <button className="text-2xl hover:text-red-600" onClick={logout}>
          <IoLogOutOutline />
        </button>
      </div>
    </div>
  );
};

export default Header;
