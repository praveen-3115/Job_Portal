import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getJobDetails() {
      try {
        const res = await axios.get(`http://localhost:3000/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        setError("Job not found or unable to load details.");
      } finally {
        setLoading(false);
      }
    }

    getJobDetails();
  }, [id]);

  if (loading) {
    return <div className="container py-5">Loading job details...</div>;
  }

  if (error) {
    return (
      <div className="container py-5">
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => navigate("/jobs")}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/jobs")}
      >
        ← Back to Jobs
      </button>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 p-md-5">
          <h2 className="fw-bold mb-2">{job.title}</h2>
          <h5 className="text-primary mb-4">{job.company}</h5>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <strong>Location</strong>
              <p>{job.location}</p>
            </div>

            <div className="col-md-4">
              <strong>Job Type</strong>
              <p>{job.type}</p>
            </div>

            <div className="col-md-4">
              <strong>Salary</strong>
              <p>{job.salary}</p>
            </div>
          </div>

          <hr />

          <h5 className="fw-bold mt-4">Job Description</h5>
          <p>{job.description || "No description available."}</p>

          <h5 className="fw-bold mt-4">Required Skills</h5>
          <div className="d-flex flex-wrap gap-2">
            {(Array.isArray(job.skills) ? job.skills : []).map(
              (skill, index) => (
                <span
                  className="badge bg-primary-subtle text-primary p-2"
                  key={index}
                >
                  {skill}
                </span>
              ),
            )}
          </div>

          <button
            className="btn btn-primary mt-4 px-4"
            onClick={() => alert("Application feature coming soon!")}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
