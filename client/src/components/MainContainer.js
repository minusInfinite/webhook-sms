import React, {useState} from "react"
import {AppBar, Toolbar,Typography, Box} from "@mui/material"
import Login from "../content/Login";
import Signup from "../content/Signup";
import Navbar from "./Navbar";
import auth from "../utils/auth";
import Dashboard from "../content/Dashboard";
import Home from "../content/Home";

function MainContainer() {
  const [currentContent, setCurrentContent] = useState(auth.loggedIn()? "Dashboard":"Home");
  const displayContent = () => {
    if (currentContent === "Signup") {
      return <Signup />;
    }
    if (currentContent === "Login") {
      return <Login />;
    }
    if (currentContent === "Dashboard" && auth.loggedIn()) {
      return <Dashboard />;
    }
    return <Home />;
  };

  const handleContentChange = (content) => setCurrentContent(content);

  return (
    <>
      <AppBar position="static" sx={{bgcolor: "text.primary"}}>
        <Toolbar>
          <Typography component="span"  sx={{flexGrow: 1}}> Webhook-SMS </Typography>
        <Navbar
          currentContent={currentContent}
          handleContentChange={handleContentChange}
        />
        </Toolbar>
      </AppBar>
      {displayContent()}
      <Box component="footer" sx={{position: "fixed",bottom:"0rem", width:"100%",textAlign:"center", mt:"0.8rem"}}>
        <Typography variant="h5" gutterBottom component="h2">main by minusinfinite&copy;</Typography>
      </Box>
    </>
  );
}

export default MainContainer;
