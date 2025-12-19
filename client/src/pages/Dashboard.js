import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const { user } = useAuth();          // ✅ get auth state
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // ✅ only fetch when token exists
    if (!user?.token) return;

    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, [user]);   // 👈 depends on user

  // STATUS COUNTS
  const pending = jobs.filter(j => j.status === "pending").length;
  const interview = jobs.filter(j => j.status === "interview").length;
  const declined = jobs.filter(j => j.status === "declined").length;

  return (
    <DashboardLayout>
      <div className="stats-grid">
        <StatsCard
          title="Pending Applications"
          count={pending}
          color="yellow"
        />
        <StatsCard
          title="Ongoing / Scheduled"
          count={interview}
          color="blue"
        />
        <StatsCard
          title="Jobs Declined"
          count={declined}
          color="red"
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
