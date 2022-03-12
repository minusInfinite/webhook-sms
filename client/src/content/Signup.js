import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Box,
  Alert,
  Collapse,
  Button,
  Container,
  Input,
  chakra,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Heading,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  let navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.reportValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
      if (Auth.loggedIn()) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
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
          Sign Up
        </Heading>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
          <chakra.form onSubmit={handleFormSubmit} noValidate>
            <Collapse in={showAlert} animateOpacity>
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  Something went wrong with your attempt to Signup!
                </AlertDescription>
                <CloseButton
                  pos={'absolute'}
                  right="0.5rem"
                  top="0.5rem"
                  onClick={() => setShowAlert(false)}
                />
              </Alert>
            </Collapse>
            <FormControl isRequired>
              <FormLabel py={1} htmlFor="username">
                Username
              </FormLabel>
              <Input
                my={1}
                id="username"
                name="username"
                autoComplete="username"
                type="text"
                autoFocus
                onChange={handleInputChange}
                value={userFormData.username}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel py={1} htmlFor="email">
                Email
              </FormLabel>
              <Input
                my={1}
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                onChange={handleInputChange}
                value={userFormData.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel py={1} htmlFor="password">
                Password
              </FormLabel>
              <Input
                my={1}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={userFormData.password}
              />
            </FormControl>
            <Button
              disabled={
                !(
                  userFormData.username &&
                  userFormData.email &&
                  userFormData.password
                )
              }
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </chakra.form>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
