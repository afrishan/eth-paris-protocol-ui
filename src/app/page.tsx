'use client';
import {
  Flex,
  Container,
  Spacer,
  Image,
  Stack,
  Button,
  Text,
  Center
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';

export default function Home() {
  const { push } = useRouter();

  return (
    <Container maxW="container.lg">
      <Flex mt="12">
        <Image src= './parity-logo.svg' alt='Parity Logo' />
        <Spacer />
        <Stack spacing={4} direction='row' align='center'>
          <Button colorScheme='teal' borderRadius='1.5rem'>
            Employee
          </Button>
          <Button colorScheme='teal' borderRadius='1.5rem'>
            Employer
          </Button>
        </Stack>
      </Flex>
      <Center mt="16">
        <Image maxW="240" src='./parity_homeimage1.svg' alt='Parity Logo' />
        <Text mx="40" fontSize='xxl'>Level the Playing Field</Text>
        <Image maxW="240" src='./parity_homeimage2.svg' alt='Parity Logo' />
      </Center>
      <Center mt="8">
        <Text>Parity is your one-stop-shop for thousands of digital freelance and full-time jobs.</Text>
      </Center>
      <Center mt="16" alignItems='center'>
        <Button colorScheme='teal' borderRadius='1.5rem' onClick={() => push('/signup')}>
          Get Started
        </Button>
      </Center>
    </Container>
  );
}
