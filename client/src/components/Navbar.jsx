import Auth from '../utils/auth';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  HStack,
  Link,
  chakra,
  VisuallyHidden,
  Button,
} from '@chakra-ui/react';

export default function Navbar() {
  const bg = 'gray.800';
  const buttonHover = { color: "gray.800", bg: "gray.100" }

  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        alignSelf="flex-start"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>WebHook-SMS</VisuallyHidden>
            </chakra.a>
            <chakra.h1 color={'white'} fontSize="xl" fontWeight="medium" ml="2">
              <Link as={RouterLink} to="/">
                Webhook-SMS
              </Link>
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack spacing={1} mr={1} color="blue.500" display={'inline-flex'}>
              {Auth.loggedIn() ? (
                <>
                  <Button as={RouterLink} color="gray.100" _hover={buttonHover} to="/help" variant="ghost">
                    Help
                  </Button>
                  <Button as={RouterLink} color="gray.100" _hover={buttonHover} to="/dashboard" variant="ghost">
                    Dashboard
                  </Button>
                </>
              ) : (
                <Button as={RouterLink} color="gray.100" _hover={buttonHover} to="/login" variant="ghost">
                  login
                </Button>
              )}
            </HStack>
            {Auth.loggedIn() ? (
              <Button onClick={Auth.logout} colorScheme="gray">
                Logout
              </Button>
            ) : (
              <Button as={RouterLink} to="/signup" colorScheme="gray">
                Sign Up
              </Button>
            )}
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
}
