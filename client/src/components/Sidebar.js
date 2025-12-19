import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Job.io</h2>

      <nav>
        <Link to="/dashboard">📊 Stats</Link>
        <Link to="/all-jobs">📄 All Jobs</Link>
        <Link to="/add-job">➕ Add Job</Link>
        <Link to="/profile">👤 Profile</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
