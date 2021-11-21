import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import auth from "src/utils/auth";
import { REMOVE_SERVICE, SAVE_SERVICE } from "src/utils/mutations";
import { GET_ME } from "src/utils/queries";
import {
  CircularProgress,
  Box,
  Card,
  IconButton,
  Typography,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Link,
  Collapse,
  Alert,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Dashboard = () => {
  const [serviceFormData, setServiceFormData] = useState({
    serviceNumber: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, data } = useQuery(GET_ME);
  const [saveService, { errors, saving, newService }] =
    useMutation(SAVE_SERVICE);
  const [removeService, { error, fetching, service }] =
    useMutation(REMOVE_SERVICE);

  let user = data?.me || {};

  const uri = window.location.origin.toString();

  if (!auth.loggedIn()) {
    return <Navigate to="/" replace={true} />;
  }

  const handleDeleteService = async (serviceNumber) => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeService({ variables: { serviceNumber } });
      user = data;
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || fetching || saving) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const dialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setServiceFormData({ ...serviceFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await saveService({
        variables: { ...serviceFormData },
      });
      user = data;
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setServiceFormData({
      serviceNumber: "",
    });
    dialogClose();
  };

  return (
    <>
      <Typography
        variant="h5d"
        component="h2"
        sx={{ flexGrow: 1, width: "100%", textAlign: "center", mt: "1rem" }}
      >
        {uri}/hook/{user.key}
      </Typography>
      <Box
        sx={{
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: "1rem" }}>
          <Typography component="span" sx={{ mx: "0.8rem" }}>
            <strong>Username: </strong>
            {user.username}
          </Typography>
          <Typography component="span" sx={{ mx: "0.8rem" }}>
            <strong>Service Count: </strong>
            {user.serviceCount}
          </Typography>
          <Typography component="span" sx={{ mx: "0.8rem" }}>
            <strong>Message Template: </strong>
            {user.msgTemplate}
          </Typography>
        </Box>
        <Button
          sx={{ mb: "1rem" }}
          variant="contained"
          onClick={() => setDialogOpen(true)}
        >
          New Service
        </Button>
        <Box
          sx={{
            justifySelf: "center",
            display: "flex",
            flexWrap: "wrap",
            textAlign: "left",
            width: "100%",
            margin: "1rem 0 4rem 2rem",
          }}
        >
          {user.serviceList.map((service) => {
            return (
              <Card
                key={service.serviceNumber}
                sx={{
                  mx: "1rem",
                  my: "0.5rem",
                  position: "relative",
                  minWidth: "25rem",
                }}
              >
                <CardContent sx={{ mr: "1rem" }}>
                  <Typography gutterBottom>
                    <strong>Service Number:</strong> {service.serviceNumber}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Last Sent At:</strong> {service.lastMessage}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Last Message Status:</strong> {service.lastStatus}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Total Message Count:</strong>
                    {service.messageCount}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Total Usage Cost:</strong>
                    {service.usageCost}
                  </Typography>
                </CardContent>
                <IconButton
                  variant="contained"
                  color="error"
                  aria-label="delete service number"
                  onClick={() => handleDeleteService(service.serviceNumber)}
                  sx={{
                    position: "absolute",
                    right: "0.1rem",
                    top: "0.1rem",
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={dialogClose}>
        <DialogTitle>Add Service Number</DialogTitle>
        <Box component="form" onSubmit={handleFormSubmit} noValidate>
          <DialogContent>
            <DialogContentText>
              Add a service number, be sure to confirm the{" "}
              <Link
                href="https://countrycode.org/"
                targer="_blank"
                rel="noreferrer"
              >
                county code
              </Link>
            </DialogContentText>

            <Collapse in={showAlert}>
              <Alert severity="error" onClose={() => setShowAlert(false)}>
                Something went wrong when adding your service!
              </Alert>
            </Collapse>
            <TextField
              autoFocus
              error={validated}
              margin="dense"
              id="serviceNumber"
              label="Service Number"
              type="text"
              name="serviceNumber"
              fullWidth
              variant="standard"
              maxLength="12"
              onChange={handleInputChange}
              value={serviceFormData.serviceNumber}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              disabled={!serviceFormData.serviceNumber}
            >
              Add Service
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default Dashboard;
