import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      as={'footer'}
      w={'full'}
      h={16}
      pt={-2}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      pos={'absolute'}
      bottom={'0'}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={'column'}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Text>© minusInfinite. All rights reserved</Text>
      </Container>
    </Box>
  );
}
