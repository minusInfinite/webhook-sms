import Auth from "../utils/auth";
import { Link } from "@mui/material";
function Navbar({ currentContent, handleContentChange }) {
  return (
    <nav>
      {Auth.loggedIn() ? (
        <>
          <Link variant="button" sx={{px:"0.8rem"}}
            onClick={() => handleContentChange("Dashboard")}
            className={currentContent === "Dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link sx={{px:"0.8rem"}} variant="button" onClick={Auth.logout}>Logout</Link>
        </>
      ) : (
        <>
          <Link sx={{px:"0.8rem"}} variant="button" onClick={() => handleContentChange("Login")}
              className={currentContent === "Login" ? "active" : ""}
            >
              Login
          </Link>
          <Link sx={{px:"0.8rem"}} variant="button" onClick={() => handleContentChange("Signup")}
              className={currentContent === "Sign Up" ? "active" : ""}
            >
              Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
