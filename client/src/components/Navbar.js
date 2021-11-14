import Auth from "../utils/auth";
import { Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Navbar({ currentContent, handleContentChange }) {
  return (
    <>
      <Typography
        variant="body1"
        component={RouterLink}
        sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
        to="/"
      >
        Webhook-SMS
      </Typography>
      <nav>
        {Auth.loggedIn() ? (
          <>
            <Link
              component={RouterLink}
              variant="button"
              sx={{ px: "0.8rem" }}
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link sx={{ px: "0.8rem" }} variant="button" onClick={Auth.logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              component={RouterLink}
              sx={{ px: "0.8rem" }}
              variant="button"
              to="/login"
            >
              Login
            </Link>
            <Link
              component={RouterLink}
              sx={{ px: "0.8rem" }}
              variant="button"
              to="/signup"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
