import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar-top">
      <h3>Dashboard</h3>
      <div className="user-info">
        <span>{user.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
