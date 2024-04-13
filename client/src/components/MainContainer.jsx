import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainContainer() {
  return (
    <>
      <AppBar position="sticky" sx={{ top: "0", backgroundColor: "#212121" }}>
        <Toolbar>
          <Navbar />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[300],
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxHeight: "100vh",
          pb: "20%",
        }}
      >
        <Outlet />
      </Box>
      <Box
        component="footer"
        sx={{
          backgroundColor: "#fff",
          position: "fixed",
          bottom: "0rem",
          width: "100%",
          maxHeight: "20%",
          textAlign: "center",
          mt: "0.8rem",
        }}
      >
        <Typography variant="h5" gutterBottom component="h2">
          made by minusinfinite&copy;
        </Typography>
      </Box>
    </>
  );
}

export default MainContainer;
