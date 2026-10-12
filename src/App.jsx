import { useState, useEffect } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./assets/Home";
import FindJobs from "./components/Findjobs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobDetails from "./components/Job_Details";
import AdminRegister from "./components/Admin/AdminRegister";
import Login from "./components/Admin/AdminLogin";
import Bookmarks from "./components/Bookmarks";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);

    document.body.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return (
    <div className={`app theme-${theme}`}>
      <BrowserRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<FindJobs />} />
          <Route path="/job_details/:id" element={<JobDetails />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/saved-jobs" element={<Bookmarks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
