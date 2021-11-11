function Navbar({ currentContent, handleContentChange }) {
  return (
    <nav>
      <ul>
        <li>
          <a
            href="#Dashboard"
            onClick={() => handleContentChange("Dashboard")}
            className={currentContent === "Dashboard" ? "active" : ""}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#Login"
            onClick={() => handleContentChange("Login")}
            className={currentContent === "Login" ? "active" : ""}
          >
            Login
          </a>
        </li>
        <li>
          <a
            href="#Sign Up"
            onClick={() => handleContentChange("Signup")}
            className={currentContent === "Sign Up" ? "active" : ""}
          >
            Sign Up
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
