import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

const Profile = () => {
  const { login } = useAuth(); // ✅ USE CONTEXT
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save profile
  const saveProfile = async () => {
    try {
      const oldUser = JSON.parse(localStorage.getItem("user"));

      const res = await API.patch("/users/profile", user);

      // ✅ Merge old token with updated profile
      const updatedUser = {
        ...oldUser,   // keeps token, role, etc.
        ...res.data
      };

      // ✅ Update AuthContext + localStorage
      login(updatedUser);

      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Profile update failed", error);
      alert("Failed to update profile");
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-grid">
          <div>
            <label>Name</label>
            <input
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div>
            <label>Email</label>
            <input value={user.email || ""} disabled />
          </div>

          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={user.gender || ""}
              onChange={handleChange}
              disabled={!editMode}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={user.age || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div>
            <label>Profession</label>
            <input
              name="profession"
              value={user.profession || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div>
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={user.experience || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div>
            <label>Location</label>
            <input
              name="location"
              value={user.location || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div className="full-width">
            <label>About</label>
            <textarea
              name="bio"
              value={user.bio || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>

        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="save-btn" onClick={saveProfile}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
