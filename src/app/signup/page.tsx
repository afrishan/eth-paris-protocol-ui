'use client';
import {
  Flex,
  Container,
  Image,
  Stack,
  Button,
  Text,
  Center, 
  Input, 
  HStack, 
  VStack, 
  Box, 
  Spacer, 
} from '@chakra-ui/react'
import React, { useState } from 'react';


function Stage1( setStage : { setStage: (stage: number) => void}) {

  return (
    <Container maxW="container.lg">
      <Flex mt="12">
        <Image src='./parity-logo.svg' alt='Parity Logo' />
        <Spacer />
      </Flex>
      <Center mt="4"><Text>Welcome to Parity</Text></Center>
      <Center mt="12"><Text>Are you an?</Text></Center>
      <Center mt="4">
        <Stack spacing={4} direction='row' align='center'>
          <Button colorScheme='teal' borderRadius='1.5rem' onClick={() => setStage.setStage(2)}>
            Employee
          </Button>
          <Button colorScheme='teal' borderRadius='1.5rem'>
            Organisation
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}

function Stage2( setStage : { setStage: (stage: number) => void}) {
  
  return (
    <Container maxW="container.lg">
      <Flex mt="12">
        <Image src='./parity-logo.svg' alt='Parity Logo' />
        <Spacer />
      </Flex>

      <VStack>
      <Center mt="12"><Text>WELCOME!</Text></Center>
      <Stack spacing={3}>
        <Input placeholder='email address' size='md' />
        ^ 
        <Input placeholder='password' size='md' />
        ^
      </Stack>       
      <Center mt="4">
        <Stack spacing={4} direction='row' align='center'>
          <Button colorScheme='teal' borderRadius='1.5rem' 
            onClick={() => setStage.setStage(3)}>
            Log In
          </Button>
          <Button colorScheme='teal' borderRadius='1.5rem'>
            Register
          </Button>
        </Stack>
      </Center>
      <Center mt="34"><Text>---------- or ----------</Text></Center>
    <Flex mt="12">
    <Center mt="20">
      <Stack spacing={20} direction='row' align='center'>
        <Image src='./biconomy-logo 1.svg' alt='Biconomy Logo' />
        <Image src='./wallet-connect-logo 1.svg' alt='WalletConnet Logo' />
        <Image src='./matic-logo 1.svg' alt='Polygon Logo' />
      </Stack>
      </Center>
    </Flex>
    <Center mt="4">
      <Stack spacing={4} direction='row' align='center'>
      </Stack>
    </Center>
    
    </VStack>
  </Container>
  );
}


//stage of the profil
function Stage3( setStage : { setStage: (stage: number) => void}) {

  return (
    <Container maxW="container.lg">
       <Flex mt="12">
        <Image src='./parity-logo.svg' alt='Parity Logo' />
        <Spacer />
      </Flex>
      <Center mt="12"><Text color="black" fontSize='5xl'>Finish your profile!</Text></Center>

      <VStack>
        <Input placeholder='Username'></Input>
        <Input placeholder='Full Name'></Input>
        <Input placeholder='Location'></Input>
        <Input placeholder='Job Title'></Input>
        <Input placeholder='Company Name'></Input>
        <Input placeholder='Industry'></Input>

        <Flex 
          align="center"
          justify="space-betwwen"
          >
      
          <Button colorScheme='purple' borderRadius='1.5rem'> Verify with Sismo </Button> 
          <Spacer/>
          <Image src="./sismo-badge.svg" boxSize="50px" alt="Sismo Badge"/>
        </Flex>
        

      </VStack>


  </Container>
    );
  }; 


function Stage4( setStage : { setStage: (stage: number) => void}) {
  
  return (
    <Container maxW="container.lg">
      <Flex mt="12">
        <Image src='./parity-logo.svg' alt='Parity Logo' />
        <Spacer />
      </Flex>
      <Center mt="12"><Text>Leave a truly anonymous review to join the community!</Text></Center>
      <Stack spacing={3}>
        <Input placeholder='Length of time at company' size='md' />
        ^ 
        <Input placeholder='Number of years experience' size='md' />
        ^
        <Input placeholder='Salary' size='md' />
        ^
        <Input placeholder='Summarise your experience' size='md' />
        ^
      </Stack>       
      <Center mt="4">
        <Stack spacing={4} direction='row' align='center'>
          <Button colorScheme='teal' borderRadius='1.5rem' 
            onClick={() => setStage.setStage(3)}>
            Turn in.
          </Button>
        </Stack>
      </Center>
      <Center mt="34"><Text>--------------------</Text></Center>
    <Flex mt="12">
    </Flex>
    <Center mt="4">
      <Stack spacing={4} direction='row' align='center'>
      </Stack>
    </Center>
  </Container>
  );
}; 



export default function Home() {
  const [stage, setStage] = useState(1);
  return (
    stage === 1 ? 
      <Stage1 setStage={() => setStage(2)} /> :
    stage === 2 ? 
      <Stage2 setStage={() => setStage(3)}/> : 
    stage === 3 ?
      <Stage3 setStage={() => setStage(4)}/> :
    null
  );
};