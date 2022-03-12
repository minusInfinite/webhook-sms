import { Card, CardContent, IconButton, Text } from "@chakra-ui/react";

function ServiceCards(props) {
  return (
    <>
      <Card
        key={props.serviceNumber}
        sx={{
          mx: "1rem",
          my: "0.5rem",
          position: "relative",
          minWidth: "25rem",
        }}
      >
        <CardContent sx={{ mr: "1rem" }}>
          <Text mb={1}>
            <strong>Service Number:</strong> {props.serviceNumber}
          </Text>
          <Text mb={1}>
            <strong>Last Sent At:</strong> {props.lastMessage}
          </Text>
          <Text mb={1}>
            <strong>Last Message Status:</strong> {props.lastStatus}
          </Text>
          <Text mb={1}>
            <strong>Total Message Count:</strong>
            {props.messageCount}
          </Text>
          <Text mb={1}>
            <strong>Total Usage Cost:</strong>
            {props.usageCost}
          </Text>
        </CardContent>
        <IconButton
          variant="contained"
          color="error"
          aria-label="delete service number"
          onClick={() => props.delete(props.serviceNumber)}
          sx={{
            position: "absolute",
            right: "0.1rem",
            top: "0.1rem",
          }}
        >
          <ClearIcon />
        </IconButton>
      </Card>
    </>
  );
}

export default ServiceCards;
