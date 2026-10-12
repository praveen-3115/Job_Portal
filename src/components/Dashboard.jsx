import React from "react";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge bg-primary-subtle text-primary mb-3 p-2">
                YOUR CAREER STARTS HERE
              </span>

              <h1 className="display-4 fw-bold mb-4">
                Find Your <span className="text-primary">Dream Job</span>
                <br />
                Build Your Future
              </h1>

              <p className="lead text-secondary mb-4">
                Discover opportunities that match your skills, explore exciting
                careers, and take the next step towards your professional goals.
              </p>

              {/* Search Form */}
              <form
                className="bg-white shadow-sm rounded p-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="row g-2">
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control form-control-lg border-0"
                      placeholder="Job title or skill"
                      aria-label="Job title or skill"
                    />
                  </div>

                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control form-control-lg border-0"
                      placeholder="Location"
                      aria-label="Location"
                    />
                  </div>

                  <div className="col-md-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>

              <p className="text-secondary mt-3 mb-0">
                Popular: React Developer, Python Developer, Data Analyst
              </p>
            </div>

            <div className="col-lg-5 mt-5 mt-lg-0 text-center">
              <div className="bg-white rounded-4 shadow p-5">
                <div className="display-1 text-primary mb-3">
                  <i className="bi bi-briefcase-fill"></i>
                </div>

                <h3 className="fw-bold">Your Next Opportunity</h3>

                <p className="text-secondary mb-0">
                  The right opportunity can change your future. Start exploring
                  today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Explore Job Categories</h2>
          <p className="text-secondary">
            Discover opportunities across different career paths.
          </p>
        </div>

        <div className="row g-4">
          {[
            { name: "Software Development", icon: "bi-code-slash" },
            { name: "Data Analytics", icon: "bi-bar-chart-line" },
            { name: "UI/UX Design", icon: "bi-palette" },
            { name: "Digital Marketing", icon: "bi-megaphone" },
          ].map((category) => (
            <div className="col-12 col-sm-6 col-lg-3" key={category.name}>
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  <i className={`bi ${category.icon} fs-1 text-primary`}></i>

                  <h5 className="fw-bold mt-3">{category.name}</h5>

                  <p className="text-secondary mb-0">
                    Explore career opportunities
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose JobConnect?</h2>
            <p className="text-secondary">
              Everything you need to move forward in your career.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center p-3">
                <i className="bi bi-search fs-1 text-primary"></i>
                <h5 className="fw-bold mt-3">Easy Job Search</h5>
                <p className="text-secondary">
                  Find relevant opportunities based on your skills and
                  interests.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center p-3">
                <i className="bi bi-building fs-1 text-primary"></i>
                <h5 className="fw-bold mt-3">Top Companies</h5>
                <p className="text-secondary">
                  Explore opportunities from a range of employers.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center p-3">
                <i className="bi bi-graph-up-arrow fs-1 text-primary"></i>
                <h5 className="fw-bold mt-3">Career Growth</h5>
                <p className="text-secondary">
                  Take the next step towards your professional goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-5">
        <div className="bg-primary text-white rounded-4 p-5 text-center">
          <h2 className="fw-bold">Ready for Your Next Opportunity?</h2>

          <p className="lead mt-3">
            Start exploring jobs and take the next step in your career.
          </p>

          <button className="btn btn-light btn-lg text-primary fw-semibold mt-2">
            Explore Jobs
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
