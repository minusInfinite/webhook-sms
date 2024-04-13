import { Box, CloseButton, chakra } from '@chakra-ui/react';
import ErrorBoundary from './ErrorBoundary';

function ServiceCards({
  id,
  key,
  outerBoxGB,
  innerBoxGB,
  deleteCard,
  cardTitle,
  cardColor,
  msgTemplate,
  serviceCount,
  usageCost,
  ...props
}) {
  return (
    <>
      <Box
        pos="relative"
        id={id}
        key={key}
        mx="auto"
        my="1rem"
        bg={outerBoxGB}
        shadow="lg"
        rounded="lg"
      >
        <CloseButton
          color="red.500"
          pos="absolute"
          top="8px"
          right="8px"
          size="sm"
          onClick={() => {
            deleteCard(props.key);
          }}
        />
        <Box px={4} py={2}>
          <chakra.h1
            color={innerBoxGB}
            fontWeight="bold"
            fontSize="2xl"
            textTransform="uppercase"
          >
            {cardTitle}
          </chakra.h1>
          <chakra.p mt={1} fontSize="sm" color={cardColor}>
            <chakra.strong>Message Template:</chakra.strong>
            {msgTemplate}
            <br />
            <chakra.strong>Service Count:</chakra.strong>
            {serviceCount}
            <br />
            <chakra.strong>Total Usage Cost:</chakra.strong>
            {usageCost}
          </chakra.p>
        </Box>
      </Box>
    </>
  );
}

export default ServiceCards;
