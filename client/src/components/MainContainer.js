import React, {useState} from "react"
import Login from "../content/Login";
import Signup from "../content/Signup";
import Navbar from "./Navbar";

function MainContainer() {
  const [currentContent, setCurrentContent] = useState("Signup");
  const displayContent = () => {
    if (currentContent === "Signup") {
      return <Signup />;
    }
    if (currentContent === "Login") {
      return <Login />;
    }
    // if (currentContent === "Dashboard") {
    //   return <Dashboard />;
    // }
    // return <Home />;
  };

  const handleContentChange = (content) => setCurrentContent(content);

  return (
    <>
      <header>
        <Navbar
          currentContent={currentContent}
          handleContentChange={handleContentChange}
        />
      </header>
      {displayContent()}
      <footer>
        <h2>main by minusinfinite&copy;</h2>
      </footer>
    </>
  );
}

export default MainContainer;
