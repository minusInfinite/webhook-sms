import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_SERVICE_LIST, REMOVE_SERVICE_LIST } from '../utils/mutations';
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
} from '@chakra-ui/react';
import DialogForm from '../components/DialogForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const userQuery = useQuery(GET_ME, { fetchPolicy: 'cache-and-network' });
  const [userData, setUserData] = useState();
  const [isAddLoading, addLoadingState] = useState(false);
  const [serviceListFormData, setServiceListFormData] = useState({
    listName: '',
  });

  const alertOpen = useDisclosure();
  const dialogOpen = useDisclosure();

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

  const fields = [
    {
      id: 'listName',
      label: 'List Name',
      required: true,
    },
  ];

  const uri = window.location.origin.toString();

  const initialRef = useRef();

  const outerBoxGB = useColorModeValue('white', 'gray.800'),
    innerBoxGB = useColorModeValue('gray.800', 'white'),
    cardColor = useColorModeValue('gray.600', 'gray.400');

  if (!auth.loggedIn()) {
    return navigate('/', { replace: true });
  }

  if (addSLMutation.loading) {
    addLoadingState(true);
  }

  if (userQuery.loading) {
    return (
      <>
        <CircularProgress isIndeterminate />
      </>
    );
  }

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
