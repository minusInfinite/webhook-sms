import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import {
  Box,
  Alert,
  Text,
  Collapse,
  Button,
  Container,
  Input,
  chakra,
  AlertIcon,
  AlertDescription,
  CloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
  });
  let navigate = useNavigate();
  const alertDisplay = useDisclosure();
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  /**
   *
   * @param {HTMLFormElement} event
   */
  const handleFormSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.reportValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
      if (Auth.loggedIn()) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      alertDisplay.onOpen();
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: '#fff',
          my: '2rem',
          p: '2rem',
          h: 'fit-content',
          borderRadius: '1rem',
          boxShadow: '1px 1px 3px #424242',
        }}
      >
        <Heading as="h1" size="lg" align="center">
          Login
        </Heading>
        <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1, mt: 1 }}>
          <chakra.form onSubmit={handleFormSubmit} noValidate>
            <Collapse in={alertDisplay.isOpen} animateOpacity>
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  {error ? error.message : "Something went wrong with your login!"}
                </AlertDescription>
                <CloseButton
                  pos={'absolute'}
                  right="0.5rem"
                  top="0.5rem"
                  onClick={() => alertDisplay.onClose()}
                />
              </Alert>
            </Collapse>
            <FormControl isRequired>
              <FormLabel py={1} htmlFor="email">
                Email Address
              </FormLabel>
              <Input
                margin="normal"
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                onChange={handleInputChange}
                value={userFormData.email}
              />
              <FormControl py={1} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  margin="normal"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                />
              </FormControl>
              <Button
                disabled={!(userFormData.email && userFormData.password)}
                type="submit"
                variant="solid"
              >
                Login
              </Button>
            </FormControl>
          </chakra.form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
