import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/footer.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let currentUser = null;
  try {
    const raw = localStorage.getItem("currentUser");
    currentUser = raw ? JSON.parse(raw) : null;
  } catch (err) {
    currentUser = null;
  }

  const isLoggedIn = Boolean(currentUser);

  const pathname = location?.pathname || "";
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";
  const isLandingPage = pathname === "/" || pathname === "/home";

  const getDashboardPath = (role) => {
    const rolePaths = {
      student: "/student",
      teacher: "/teacher",
      orgadmin: "/orgadmin",
      advisor: "/eventadmin",
      participant: "/participant",
      admin: "/admin",
    };
    return rolePaths[role] || "/";
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full bg-white h-18 shadow-md flex items-center justify-between px-4">
      {/* Logo */}
      <Link to="/" aria-label="Go to landing page">
        <img
          src={logo}
          alt="TrustMark Logo"
          className="w-40 h-27 object-contain cursor-pointer "
        />
      </Link>

      {/* Auth actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {!isLoggedIn ? (
          <>
            {isLoginPage ? (
              <Link
                to="/signup"
                className="nav-auth-btn nav-auth-btn-primary"
              >
                Sign Up
              </Link>
            ) : isSignupPage ? (
              <Link
                to="/login"
                className="nav-auth-btn nav-auth-btn-outline"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-auth-btn nav-auth-btn-outline"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="nav-auth-btn nav-auth-btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            {isLandingPage && (
              <Link
                to={getDashboardPath(currentUser.role)}
                className="nav-auth-btn nav-auth-btn-primary"
              >
                Dashboard
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="nav-auth-btn nav-auth-btn-logout"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
