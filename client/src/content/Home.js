import { Box, Text, Container, Divider, Heading } from '@chakra-ui/react';

function Home() {
  return (
    <>
      <Box m={'1rem'} p={'1rem'} alignSelf="flex-start">
        <Heading as="h2" size={'lg'}>
          Welcome to Webhook-SMS
        </Heading>
        <Divider mt={'0.5rem'} variant="solid" />
        <Text as="p" mt={'1rem'} fontSize={'1.15rem'}>
          This is a service that provide you a URL to be used as a Wehooks. When
          triggered will send an SMS to a designated list of services.
          <br />
          At this time the SMS API used in this system if self funded. If you
          would like to contribute to improving this service please{' '}
          <a href="mailto:ashley@minusinfinite.net?subject=supporting Webhook-SMS">
            contact me{' '}
          </a>
          or you can support directly via{' '}
          <a href="https://paypal.me/minusInfinite?country.x=AU&locale.x=en_AU">
            paypal
          </a>
        </Text>
        <Heading as="h3" size={'md'} mt={'1rem'} fontSize={'1.15rem'}>
          TO-DO
        </Heading>
        <Text as="ul" sx={{ mt: '1rem', fontSize: '1.15rem' }}>
          <li>A function to edit the message template.</li>
          <li>A method providing monthly invoicing for service cost.</li>
        </Text>
      </Box>
    </>
  );
}

export default Home;
