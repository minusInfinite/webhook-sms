import {
  Modal,
  ModalContent,
  ModalOverlay,
  chakra,
  Collapse,
  Alert,
  AlertIcon,
  AlertDescription,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function DialogForm({
  initialFocusRef,
  dialogIsOpen,
  dialogOnClose,
  alertIsOpen,
  alertOnClose,
  diaglogHeader,
  formId,
  submitHandler,
  inputChangeHandler,
  fields,
  formState,
  buttonLoading,
}) {
  return (
    <Modal
      initialFocusRef={initialFocusRef}
      isOpen={dialogIsOpen}
      isCentered
      onClose={() => {
        dialogOnClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{diaglogHeader}</ModalHeader>
        <ModalCloseButton />
        <chakra.form
          onSubmit={e => {
            e.preventDefault();
            submitHandler();
          }}
          id={formId}
          noValidate
        >
          <ModalBody pb={4} w="100%">
            <Collapse in={alertIsOpen} animateOpacity>
              <Alert status="error">
                <AlertIcon />
                <AlertDescription
                  onClick={() => {
                    alertOnClose();
                  }}
                >
                  Something went wrong when adding your service!
                </AlertDescription>
              </Alert>
            </Collapse>
            <Stack spacing={4}>
              {fields.map(field => {
                return (
                  <FormControl
                    key={`form-control-${field.id}`}
                    isRequired={fields?.required}
                  >
                    <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                    <Input
                      id={field.id}
                      type={field.type}
                      name={field.id}
                      onChange={e =>
                        inputChangeHandler({
                          ...formState,
                          [field.id]: e.target.value,
                        })
                      }
                      ref={initialFocusRef}
                      value={formState[field.id]}
                    />
                  </FormControl>
                );
              })}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ErrorBoundary>
              <Button
                isLoading={buttonLoading}
                type="submit"
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
            </ErrorBoundary>
          </ModalFooter>
        </chakra.form>
      </ModalContent>
    </Modal>
  );
}
