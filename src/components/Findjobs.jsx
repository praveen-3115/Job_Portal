import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000";

function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("loggedInUser");
  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    user = null;
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const jobsResponse = await axios.get(`${API}/jobs`);
        setJobs(jobsResponse.data);

        if (user) {
          const bookmarkResponse = await axios.get(`${API}/jobs`, {
            params: { userId: user.id },
          });

          setBookmarks(bookmarkResponse.data);
        }
      } catch (err) {
        console.error("Find Jobs error:", err);
        console.error("Error response:", err.response?.data);
        setError("Unable to load jobs: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function toggleBookmark(job) {
    if (!user) {
      alert("Please log in to save jobs.");
      navigate("/login");
      return;
    }

    const existing = bookmarks.find(
      (item) => String(item.jobId) === String(job.id),
    );

    try {
      if (existing) {
        await axios.delete(`${API}/bookmarks/${existing.id}`);

        setBookmarks((previous) =>
          previous.filter((item) => item.id !== existing.id),
        );
      } else {
        const response = await axios.post(`${API}/bookmarks`, {
          userId: user.id,
          jobId: job.id,
        });

        setBookmarks((previous) => [...previous, response.data]);
      }
    } catch (error) {
      console.log("URL:", error.config?.url);
      console.log("Method:", error.config?.method);
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
    }
  }

  if (loading) {
    return <div className="container py-5">Loading jobs...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Find Jobs</h2>

        {user && (
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/saved-jobs")}
          >
            <i className="bi bi-bookmark-fill me-2"></i>
            Saved Jobs ({bookmarks.length})
          </button>
        )}
      </div>

      <div className="row g-4">
        {jobs.map((job) => {
          const isSaved = bookmarks.some(
            (item) => String(item.jobId) === String(job.id),
          );

          return (
            <div className="col-md-6 col-lg-4" key={job.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <h5 className="card-title fw-bold">{job.title}</h5>

                    <button
                      type="button"
                      className={`btn btn-sm ${
                        isSaved ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => toggleBookmark(job)}
                      aria-label={isSaved ? "Remove saved job" : "Save job"}
                      title={isSaved ? "Remove bookmark" : "Save job"}
                    >
                      <i
                        className={`bi ${
                          isSaved ? "bi-bookmark-fill" : "bi-bookmark"
                        }`}
                      ></i>
                    </button>
                  </div>

                  <p className="text-secondary mb-1">{job.company}</p>
                  <p className="mb-1">
                    <i className="bi bi-geo-alt me-2"></i>
                    {job.location}
                  </p>
                  <p className="mb-1">
                    <strong>Type:</strong> {job.type}
                  </p>
                  <p className="mb-2">
                    <strong>Salary:</strong> {job.salary}
                  </p>

                  <p className="card-text">{job.description}</p>

                  <div className="mb-3">
                    {(job.skills || []).map((skill) => (
                      <span
                        className="badge text-bg-light border me-1 mb-1"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => navigate(`/job_details/${job.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {jobs.length === 0 && (
        <p className="text-secondary">No jobs are available right now.</p>
      )}
    </div>
  );
}

export default FindJobs;
