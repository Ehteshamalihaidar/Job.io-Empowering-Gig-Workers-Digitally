import { Link } from "react-router-dom";
import jobImg from "../assets/job-search.png"; // ✅ import image

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-content">
        {/* LEFT SIDE CONTENT */}
        <div className="landing-text">
          <h1>Job.io</h1>
          <p>
            Empowering unorganised workers to find jobs, track applications,
            and grow their careers.
          </p>

          <div className="landing-buttons">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button className="outline">Register</button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="landing-image">
          <img src={jobImg} alt="Searching for jobs online" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
