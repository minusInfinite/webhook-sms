import { Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import auth from "src/utils/auth";
import { REMOVE_SERVICE } from "src/utils/mutations";
import { GET_ME } from "src/utils/queries";
import {
  CircularProgress,
  Box,
  Container,
  Card,
  IconButton,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Dashboard = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeService, { error, fetching, service }] =
    useMutation(REMOVE_SERVICE);

  let user = data?.me || {};

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
      console.info(error, service);
      user = data;
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || fetching) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography
        variant="h5d"
        component="h2"
        sx={{ flexGrow: 1, width: "100%", textAlign: "center", mt: "1rem" }}
      >
        /hook/{user.key}
      </Typography>
      <Container
        sx={{ width: "80%", alignSelf: "center", textAlign: "center" }}
      >
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
        <Box sx={{ display: "flex", flexWrap: "wrap", textAlign: "left" }}>
          {user.serviceList.map((service) => {
            return (
              <Card
                key={service.serviceNumber}
                sx={{ m: "2rem", position: "relative" }}
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
                    right: "0.5rem",
                    top: "0.5rem",
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Card>
            );
          })}
          <Button></Button>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
