import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function syncUser() {
      const savedUser = localStorage.getItem("loggedInUser");

      try {
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setUser(null);
      }
    }

    syncUser();

    window.addEventListener("authChanged", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("authChanged", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setShowProfile(false);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link to="/" className="navbar-brand jobs-menu-logo">
        <span className="logo-highlight">J</span>
        <span>obs</span>
        <span className="logo-highlight">M</span>
        <span>enu</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/jobs">
              Find Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/saved-jobs">
              Saved Jobs
            </Link>
          </li>
        </ul>

        {/* <button className="btn btn-outline-primary ms-2" onClick={toggleTheme}>
          <i
            className={`bi ${
              theme === "light" ? "bi-moon-stars-fill" : "bi-sun-fill"
            }`}
          ></i>

          {theme === "light" ? " Dark Mode" : " Light Mode"}
        </button> */}

        <div className="d-flex align-items-center gap-2">
          {!user ? (
            <>
              <Link to="/adminlogin" className="btn btn-outline-primary">
                Login
              </Link>

              <Link to="/adminregister" className="btn btn-primary">
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-light border rounded-pill dropdown-toggle"
                type="button"
                onClick={() => setShowProfile(!showProfile)}
                aria-expanded={showProfile}
              >
                <i className="bi bi-person-circle me-2"></i>
                {user.name || "My Profile"}
              </button>

              {showProfile && (
                <ul
                  className="dropdown-menu dropdown-menu-end show"
                  style={{
                    right: 0,
                    left: "auto",
                    position: "absolute",
                  }}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/profile"
                      onClick={() => setShowProfile(false)}
                    >
                      <i className="bi bi-person me-2"></i>
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/notifications"
                      onClick={() => setShowProfile(false)}
                    >
                      <i className="bi bi-bell me-2"></i>
                      Notifications
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/about"
                      onClick={() => setShowProfile(false)}
                    >
                      <i className="bi bi-info-circle me-2"></i>
                      About
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
