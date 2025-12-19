import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

const AddJob = () => {
  const [job, setJob] = useState({
    position: "",
    company: "",
    location: "",
    status: "pending",
    jobType: "full-time"
  });

  const [myJobs, setMyJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔄 Fetch jobs posted by user
  const fetchMyJobs = async () => {
    const res = await API.get("/jobs");
    setMyJobs(res.data);
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  // ➕ ADD / ✏️ UPDATE JOB
  const submit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.patch(`/jobs/${editingId}`, job);
    } else {
      await API.post("/jobs", job);
    }

    clearForm();
    fetchMyJobs();
  };

  // 🧹 CLEAR FORM
  const clearForm = () => {
    setJob({
      position: "",
      company: "",
      location: "",
      status: "pending",
      jobType: "full-time"
    });
    setEditingId(null);
  };

  // ✏️ EDIT JOB
  const editJob = (job) => {
    setJob({
      position: job.position,
      company: job.company,
      location: job.location,
      status: job.status,
      jobType: job.jobType
    });
    setEditingId(job._id);
  };

  // 🗑 DELETE JOB
  const deleteJob = async (id) => {
    await API.delete(`/jobs/${id}`);
    fetchMyJobs();
  };

  return (
    <DashboardLayout>
      {/* ADD JOB FORM */}
      <div className="add-job-card">
        <h2>{editingId ? "Edit Job" : "Add Job"}</h2>

        <form onSubmit={submit} className="add-job-form">
          <div className="form-row">
            <div>
              <label>Position</label>
              <input
                value={job.position}
                onChange={(e) =>
                  setJob({ ...job, position: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label>Company</label>
              <input
                value={job.company}
                onChange={(e) =>
                  setJob({ ...job, company: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label>Job Location</label>
              <input
                value={job.location}
                onChange={(e) =>
                  setJob({ ...job, location: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Status</label>
              <select
                value={job.status}
                onChange={(e) =>
                  setJob({ ...job, status: e.target.value })
                }
              >
                <option value="pending">pending</option>
                <option value="interview">interview</option>
                <option value="declined">declined</option>
              </select>
            </div>

            <div>
              <label>Job Type</label>
              <select
                value={job.jobType}
                onChange={(e) =>
                  setJob({ ...job, jobType: e.target.value })
                }
              >
                <option value="full-time">full-time</option>
                <option value="part-time">part-time</option>
                <option value="contract">contract</option>
              </select>
            </div>

            <div className="btn-group">
              <button
                type="button"
                className="clear-btn"
                onClick={clearForm}
              >
                Clear
              </button>
              <button type="submit" className="submit-btn">
                {editingId ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* MY POSTED JOBS */}
      <h3 style={{ margin: "30px 0 15px" }}>My Posted Jobs</h3>

      {myJobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="jobs-grid">
          {myJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <div className="job-icon">{job.position[0]}</div>
                <div>
                  <h3>{job.position}</h3>
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
                  className="edit-btn"
                  onClick={() => editJob(job)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AddJob;
