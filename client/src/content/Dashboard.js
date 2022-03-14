import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import auth from '../utils/auth';
import {
  ADD_SERVICE,
  ADD_SERVICE_LIST,
  REMOVE_SERVICE,
  REMOVE_SERVICE_LIST,
} from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import {
  Box,
  Text,
  Button,
  useDisclosure,
  chakra,
  useColorModeValue,
  CircularProgress,
  CloseButton,
  Flex,
  Collapse,
  FormControl,
  FormLabel,
  Input,
  Container,
  ButtonGroup,
  Link,
  Stack,
  HStack,
} from '@chakra-ui/react';
import DialogForm from '../components/DialogForm';
import ErrorBoundary from '../components/ErrorBoundary';

const Dashboard = () => {
  const navigate = useNavigate();
  const userQuery = useQuery(GET_ME, { fetchPolicy: 'cache-and-network' });
  /*const [pullUserData, userQuery] = useLazyQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  }); */
  const [userData, setUserData] = useState();
  const [gqlErrors, setGqlErrors] = useState({
    status: false,
    message: '',
  });
  const [selectServiceList, setServiceList] = useState(undefined);
  const [currentServiceList, setCurrentList] = useState([]);
  const [isAddLoading, addLoadingState] = useState(false);
  const [serviceListFormData, setServiceListFormData] = useState({
    listName: '',
  });
  const [serviceNumberFormData, setServiceNumberFormData] = useState({
    serviceNumber: '',
  });
  const alertOpen = useDisclosure();
  const dialogOpen = useDisclosure();
  const addServiceOpen = useDisclosure();

  const [addServiceList, addSLMutation] = useMutation(ADD_SERVICE_LIST, {
    variables: {
      listName: serviceListFormData.listName,
    },
    onCompleted: () => {
      setServiceListFormData({ listName: '' });
      dialogOpen.onClose();
      navigate(0);
    },
  });

  const [removeServiceList, removeSLMutation] = useMutation(
    REMOVE_SERVICE_LIST,
    {
      onCompleted: () => navigate(0),
    }
  );

  const [removeService, rmServiceMutation] = useMutation(REMOVE_SERVICE, {
    onCompleted: () => navigate(0),
  });

  const [addService, addServiceMut] = useMutation(ADD_SERVICE, {
    variables: {
      listId: selectServiceList,
      serviceNumber: serviceNumberFormData.serviceNumber,
    },
    onCompleted: () => {
      setServiceListFormData({ serviceNumber: '' });
      addServiceOpen.onClose();
      navigate(0);
    },
  });

  const initialRef = useRef();

  const outerBoxGB = useColorModeValue('white', 'gray.800'),
    innerBoxGB = useColorModeValue('gray.800', 'white'),
    cardColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    if (!auth.loggedIn()) {
      return navigate('/', { replace: true });
    }
  });

  /*useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdata = await pullUserData();
        setUserData(userdata.data.me);
      } catch (e) {
        setGqlErrors({
          status: true,
          message: e.message,
        });
      }
    };
    fetchUser();
  });*/

  useEffect(() => {
    if (selectServiceList !== undefined) {
      setCurrentList(
        userData.serviceList.find(({ _id }) => _id === selectServiceList)
          ?.services
      );
    }
  }, [selectServiceList, setCurrentList, userData]);

  const dismissErrors = gqlFunction => {
    if (gqlErrors) {
      gqlFunction.reset();
      setGqlErrors({ status: false, message: '' });
    }
  };

  if (addSLMutation.loading || removeSLMutation.loading) {
    addLoadingState(true);
  }

  if (userQuery.loading) {
    return (
      <>
        <CircularProgress isIndeterminate />
      </>
    );
  }

  const fields = [
    {
      id: 'listName',
      label: 'List Name',
      required: true,
    },
  ];

  const uri = window.location.origin.toString();

  const handleDeleteServiceList = async serviceListId => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      let listId = serviceListId;
      await removeServiceList({ variables: { listId: listId } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteService = async (serviceListId, serviceNumber) => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      let listId = serviceListId;
      await removeService({
        variables: { listId: listId, serviceNumber: serviceNumber },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserData = async data => {
    if (userData && !userQuery.loading) {
      setUserData(await userQuery.data.me);
    }
    setUserData(data);
  };

  if (userData !== undefined) {
    return (
      <>
        <Box
          as={'section'}
          flex={{ base: null, md: '3 0px' }}
          order={{ base: null, md: '2' }}
          justifyItems="center"
          alignSelf="flex-start"
          textAlign="center"
        >
          <Flex direction={'column'}>
            <Box mb="1rem" mt="1rem">
              <Text as="span" sx={{ mx: '0.8rem' }}>
                <strong>Username: </strong>
                {userData.username}
              </Text>
              <Text as="span" sx={{ mx: '0.8rem' }}>
                <strong>Service Lists: </strong>
                {userData.serviceListCount}
              </Text>
            </Box>
            {selectServiceList !== undefined ? (
              <ErrorBoundary>
                <Box>
                  <Text>
                    {uri}/hook/
                    {
                      userData.serviceList.find(
                        ({ _id }) => _id === selectServiceList
                      )?.key
                    }
                  </Text>
                  <Button
                    my={'1rem'}
                    w={'25%'}
                    minH={'2.5rem'}
                    colorScheme={'gray'}
                    variant="solid"
                    onClick={() => addServiceOpen.onOpen()}
                  >
                    Add Service Number
                  </Button>
                  <Collapse in={addServiceOpen.isOpen}>
                    <Container>
                      <chakra.form
                        onSubmit={e => {
                          e.preventDefault();
                          addService();
                        }}
                        py={2}
                        px={4}
                        bg={outerBoxGB}
                        rounded="lg"
                      >
                        <Text p={4}>
                          {' '}
                          Add a service number, be sure to confirm the{' '}
                          <Link
                            href="https://countrycode.org/"
                            targer="_blank"
                            rel="noreferrer"
                          >
                            county code
                          </Link>
                        </Text>
                        <FormControl>
                          <FormLabel htmlFor="addServiceNumber">
                            Enter Service Number
                          </FormLabel>
                          <Input
                            onChange={e => {
                              setServiceNumberFormData({
                                ...serviceNumberFormData,
                                serviceNumber: e.target.value,
                              });
                            }}
                            value={serviceNumberFormData.serviceNumber}
                          />
                        </FormControl>
                        <ButtonGroup my="1rem">
                          <Button
                            type="submit"
                            isLoading={addServiceMut.loading}
                          >
                            Add
                          </Button>
                          <Button
                            onClick={() => {
                              setServiceNumberFormData({
                                ...serviceNumberFormData,
                                serviceNumber: '',
                              });
                              addServiceOpen.onClose();
                            }}
                          >
                            Cancel
                          </Button>
                        </ButtonGroup>
                      </chakra.form>
                    </Container>
                  </Collapse>
                  <Stack
                    spacing={4}
                    my="1rem"
                    direction={{ base: 'column', md: 'row' }}
                  >
                    {currentServiceList.length === 0
                      ? null
                      : currentServiceList.map(service => {
                          return (
                            <Box
                              pos="relative"
                              id={service.serviceNumber}
                              key={service._id}
                              w={{ base: 'full', md: '25%' }}
                              textAlign="initial"
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
                                  handleDeleteService(
                                    selectServiceList,
                                    service.serviceNumber
                                  );
                                }}
                              />
                              <Box px={4} py={2}>
                                <chakra.h1
                                  color={innerBoxGB}
                                  fontWeight="bold"
                                  fontSize="xl"
                                  textTransform="uppercase"
                                >
                                  {service.serviceNumber}
                                </chakra.h1>
                                <chakra.p
                                  mt={1}
                                  fontSize="sm"
                                  color={cardColor}
                                >
                                  <chakra.strong>Status:</chakra.strong>
                                  {service.LastStatus}
                                  <br />
                                  <chakra.strong>
                                    last Trigger Date:
                                  </chakra.strong>
                                  {service.serviceCount}
                                  <br />
                                  <chakra.strong>
                                    Total Usage Cost:
                                  </chakra.strong>
                                  {service.usageCost}
                                </chakra.p>
                              </Box>
                            </Box>
                          );
                        })}
                  </Stack>
                </Box>
              </ErrorBoundary>
            ) : null}
          </Flex>
        </Box>
        <Box
          as="aside"
          flex={{ base: '1 0 0' }}
          order={{ base: null, md: '1' }}
          h={{ base: '100%', md: '100%' }}
          display="flex"
          flexDirection="column"
          textAlign="left"
          my={1}
          paddingX="0.5rem"
          overflowY={'scroll'}
        >
          <Button
            my={'1rem'}
            w={'full'}
            minH={'2.5rem'}
            colorScheme={'gray'}
            variant="solid"
            onClick={dialogOpen.onOpen}
          >
            New Service List
          </Button>
          <Box>
            {userData?.serviceList.map(servicelist => {
              return (
                <Box
                  pos="relative"
                  id={servicelist.name}
                  key={servicelist._id}
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
                      handleDeleteServiceList(servicelist._id);
                    }}
                  />
                  <Box px={4} py={2}>
                    <chakra.h1
                      color={innerBoxGB}
                      fontWeight="bold"
                      fontSize="2xl"
                      textTransform="uppercase"
                      cursor={'pointer'}
                      onClick={() => setServiceList(servicelist._id)}
                    >
                      {servicelist.name}
                    </chakra.h1>
                    <chakra.p mt={1} fontSize="sm" color={cardColor}>
                      <chakra.strong>Message Template:</chakra.strong>
                      {servicelist.msgTemplate}
                      <br />
                      <chakra.strong>Service Count:</chakra.strong>
                      {servicelist.serviceCount}
                      <br />
                      <chakra.strong>Total Usage Cost:</chakra.strong>
                      {servicelist.usageCost}
                    </chakra.p>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <DialogForm
          diaglogHeader={'Add a Service List'}
          initialFocusRef={initialRef}
          dialogIsOpen={dialogOpen.isOpen}
          dialogOnClose={dialogOpen.onClose}
          alertIsOpen={alertOpen.isOpen}
          alertOnClose={alertOpen.onClose}
          formId="addServiceListForm"
          fieldData={serviceListFormData}
          fields={fields}
          submitHandler={addServiceList}
          inputChangeHandler={setServiceListFormData}
          formState={serviceListFormData}
          buttonLoading={isAddLoading}
        />
      </>
    );
  } else {
    updateUserData(userQuery.data.me);
    return (
      <>
        <CircularProgress isIndeterminate />
      </>
    );
  }
};

export default Dashboard;
