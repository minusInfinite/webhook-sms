import { Box, Typography, Container, Divider } from "@mui/material";

function Home() {
  return (
    <>
      <Box sx={{ mx: "1em", width: "100%" }}>
        <Container sx={{ mt: "2rem" }}>
          <Typography gutterBottom component="h2" variant="h4">
            Welcome to Webhook-SMS
          </Typography>
          <Divider variant="middle" />
          <Typography
            component="p"
            variant="body1"
            sx={{ mt: "1rem", fontSize: "1.15rem" }}
          >
            This is a service that provide you a URL to be used as a Wehooks.
            When triggered will send an SMS to a designated list of services.
            <br />
            At this time the SMS API used in this system if self funded. If you
            would like to contribute to improving this service please{" "}
            <a href="mailto:ashley@minusinfinite.net?subject=supporting Webhook-SMS">
              contact me{" "}
            </a>
            or you can support directly via{" "}
            <a href="https://paypal.me/minusInfinite?country.x=AU&locale.x=en_AU">
              paypal
            </a>
          </Typography>
          <Typography
            component="h3"
            variant="h5"
            sx={{ mt: "1rem", fontSize: "1.15rem" }}
          >
            TO-DO
          </Typography>
          <Typography
            component="p"
            variant="body1"
            sx={{ mt: "1rem", fontSize: "1.15rem" }}
          >
            <ul>
              <li>A function to edit the message template.</li>
              <li>A method providing monthly invoicing for service cost.</li>
            </ul>
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default Home;
