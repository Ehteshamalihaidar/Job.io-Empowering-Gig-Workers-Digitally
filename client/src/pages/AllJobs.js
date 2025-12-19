import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    jobType: "all",
    sort: "latest",
  });

  const fetchJobs = async () => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.status !== "all") params.status = filters.status;
    if (filters.jobType !== "all") params.jobType = filters.jobType;
    params.sort = filters.sort;

    const res = await API.get("/jobs", { params });
    setJobs(res.data);
    setHasSearched(true);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      jobType: "all",
      sort: "latest",
    });
    setJobs([]);
    setHasSearched(false);
  };

  return (
    <DashboardLayout>
      {/* SEARCH FORM */}
      <div className="search-card">
        <h3>Search Jobs</h3>

        <div className="search-grid">
          <input
            placeholder="Search job"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="all">all</option>
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
          </select>

          <select
            value={filters.jobType}
            onChange={(e) =>
              setFilters({ ...filters, jobType: e.target.value })
            }
          >
            <option value="all">all</option>
            <option value="full-time">full-time</option>
            <option value="part-time">part-time</option>
            <option value="contract">contract</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters({ ...filters, sort: e.target.value })
            }
          >
            <option value="latest">latest</option>
            <option value="oldest">oldest</option>
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
          </select>

          <button className="search-btn" onClick={fetchJobs}>
            Search
          </button>
          <button className="clear-btn" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {hasSearched && (
        <>
          <p className="job-count">{jobs.length} Job Found</p>

          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-header">
                  <div className="job-icon">
                    {job.position[0].toUpperCase()}
                  </div>
                  <div>
                    <h4>{job.position}</h4>
                    <p className="company">{job.company}</p>
                  </div>
                </div>

                <div className="job-info">
                  <p>📍 {job.location}</p>
                  <p>💼 {job.jobType}</p>
                </div>

                <span className={`status ${job.status}`}>
                  {job.status}
                </span>

                <div className="job-actions">
                  <button
                    className="apply-btn"
                    onClick={() =>
                      API.patch(`/jobs/${job._id}`, {
                        status: "interview",
                      }).then(fetchJobs)
                    }
                  >
                    Apply
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      API.patch(`/jobs/${job._id}`, {
                        status: "declined",
                      }).then(fetchJobs)
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AllJobs;
