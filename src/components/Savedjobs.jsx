import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  let user = null;

  try {
    const savedUser = localStorage.getItem("loggedInUser");
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    user = null;
  }

  useEffect(() => {
    if (!user) {
      navigate("/adminlogin");
      return;
    }

    async function fetchSavedJobs() {
      try {
        const [jobsResponse, bookmarksResponse] = await Promise.all([
          axios.get("http://localhost:3000/jobs"),
          axios.get("http://localhost:3000/bookmarks", {
            params: { userId: user.id },
          }),
        ]);

        const allJobs = jobsResponse.data;
        const bookmarks = bookmarksResponse.data;

        const savedJobs = bookmarks
          .map((bookmark) => {
            const job = allJobs.find(
              (item) => String(item.id) === String(bookmark.jobId),
            );

            return job ? { ...job, bookmarkId: bookmark.id } : null;
          })
          .filter(Boolean);

        setJobs(savedJobs);
      } catch (err) {
        console.error("Saved Jobs error:", err);
        setError("Unable to load saved jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchSavedJobs();
  }, []);

  async function removeBookmark(job) {
    try {
      await axios.delete(`http://localhost:3000/bookmarks/${job.bookmarkId}`);

      setJobs((previous) =>
        previous.filter((item) => item.bookmarkId !== job.bookmarkId),
      );
    } catch (err) {
      console.error("Remove bookmark error:", err);
      alert("Unable to remove this saved job.");
    }
  }

  if (!user) {
    return <div className="container py-5">Redirecting to login...</div>;
  }

  if (loading) {
    return (
      <div className="container py-5">
        <p>Loading saved jobs...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-2">
        <i className="bi bi-bookmark-fill text-primary me-2"></i>
        My Saved Jobs
      </h2>

      <p className="text-secondary mb-4">All the jobs you have bookmarked.</p>

      {error && <p className="text-danger">{error}</p>}

      {!error && jobs.length === 0 && (
        <div className="text-center border rounded-3 p-5">
          <i className="bi bi-bookmark display-4 text-secondary"></i>

          <h5 className="mt-3">No saved jobs yet</h5>

          <p className="text-secondary">
            Go to Find Jobs and bookmark a job to save it here.
          </p>

          <Link to="/jobs" className="btn btn-primary">
            Find Jobs
          </Link>
        </div>
      )}

      <div className="row g-4">
        {jobs.map((job) => (
          <div className="col-md-6 col-lg-4" key={job.bookmarkId}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{job.title}</h5>

                <p className="text-secondary mb-2">{job.company}</p>

                <p>
                  <i className="bi bi-geo-alt me-2"></i>
                  {job.location}
                </p>

                <p>
                  <strong>Job Type:</strong> {job.type}
                </p>

                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>

                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeBookmark(job)}
                    title="Remove saved job"
                    aria-label="Remove saved job"
                  >
                    <i className="bi bi-bookmark-x"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedJobs;
