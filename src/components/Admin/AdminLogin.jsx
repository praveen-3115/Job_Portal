import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  window.dispatchEvent(new Event("authChanged"));

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/users", {
        params: {
          email: form.email.trim(),
        },
      });

      const user = res.data.find((item) => item.password === form.password);

      if (user) {
        // Save the logged-in user's information for this demo
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
          }),
        );

        alert("Login successful!");
        navigate("/");
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      setMessage("Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow p-4">
            <h2 className="text-center fw-bold mb-2">Welcome Back</h2>

            <p className="text-secondary text-center mb-4">
              Login to your JobConnect account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {message && <p className="text-danger">{message}</p>}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
