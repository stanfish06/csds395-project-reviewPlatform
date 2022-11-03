import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from 'react'
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Collapse,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

export default function JoinOurTeam() {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <Box
      backgroundImage="url('/login-background.jpg')"
      backgroundRepeat='no-repeat'
      backgroundSize='100%'
      minH={"100vh"}
      position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={100}
            color='orange'>
            CaseReview
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <Text fontFamily={'heading'}
              fontSize={50}
              color='white'
            >
              Find your favorite food spots!
            </Text>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Join us
              <Text
                as={'span'}
                bgGradient="linear(to-r, #0a304e, #0a304e)"
                bgClip="text">
                !
              </Text>
            </Heading>
          </Stack>
          <Box mt={10}>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    Why do we build this app?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  Case Western Reserve University is large and diverse community. There are a lot of on-campus restaurants with various flavors, such as MeltU, Den and Chopsticks. Some of them are not present on Yelp or other crowd-sourced review platforms alike, so the comments on these restaurants are not available for students. We also realized that the issues that Case students care about are not the same as what the general public does:  Besides the food and service quality, students would also like to know if a restaurant supports case cash, takeaway orders, students discount, etc. So we, as a group of Case students, decided to design a website that allows Case students to comment on the on-campus and nearby restaurants, so students can better support each other and the gaps between the stores and students can be narrowed.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, #0a304e, #0a304e)"
              color={'white'}
              onClick={() => {
                signIn("google", {
                  callbackUrl: `${process.env.NEXT_PUBLIC_URL}/home`,
                })}}
              _hover={{
                bgGradient: 'linear(to-r, #0a304e, #0a304e)',
                boxShadow: 'xl',
              }}>
              Login with google
            </Button>
          </Box>
          form
        </Stack>
      </Container>
    </Box>
  );
}