import Head from "next/head";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import BurgerIcon from "../component/detailpagecomponents/testdata/burger.png"
import UserIcon from "../component/detailpagecomponents/testdata/user.png"

import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { getSession } from "next-auth/react";
import { Field, Form, Formik, select } from 'formik';

// only the framework of the detail page, TODO: split into components and make it functional
function DetailPage() {
  return (
    <>
    <Flex pos='sticky' width='100%' flexDir='column' justify='center' boxShadow='inner' bg='grey100' align='center'>
      <VStack spacing='24px'>
        <Box> 
          <HStack spacing='24px'>
            <Box>
              <Image src={BurgerIcon}/>
            </Box>
            <Heading as='h1' size='2xl' noOfLines={1}>
              Restaurant 1
            </Heading>
          </HStack>
        </Box>

        <Box> 
          <Text>
            [Tags] Burgers, American, Spicy
          </Text>
        </Box>

        <Box> 
          <Text color = 'green'>
            Open (10AM - 8PM)
          </Text>
        </Box>

        <Box> 
          <Text>
            CaseCash? X
          </Text>
        </Box>

        <Box>
          <VStack spacing='24px' align = 'left'>
            <Text>
            [Menu]
            </Text>
            <Box>
              <Text>
              The Classic Burger ($6)
              </Text>
              <Text fontSize='10px'>
              Beef patty, lettuce, tomatoes, pickles, cheese, onions.
              </Text>
            </Box>

            <Box>
              <Text>
              The Double Burger ($8)
              </Text>
              <Text fontSize='10px'>
              2 beef patties, lettuce, tomatoes, pickles, cheese, onions.
              </Text>
            </Box>

            <Box>
              <Text>
              The Crispy Burger ($8)
              </Text>
              <Text fontSize='10px'>
              Beef patty, bacon, lettuce, tomatoes, pickles, onions.
              </Text>
            </Box>

            <Box>
              <Text>
              Combo ($14)
              </Text>
              <Text fontSize='10px'>
              Any burger, fries, and a drink.
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box>
          <VStack spacing ='24px' align = 'left'>
            <Text>
            [Reviews]
            </Text>
            <HStack spacing='24px'>
              <Box>
                <Image src={UserIcon}/>
              </Box>
              <Text fontSize='16px'>
                John Smith ★★★★★
              </Text>
            </HStack>
            <Text fontSize='12px'>
              The food is high quality and the service is fast. You can dine in
              or if you're in a rush for class, you can order ahead and you can
              pick up reliably.

            </Text>

            <HStack spacing='16px'>
              <Box>
                <Image src={UserIcon}/>
              </Box>
              <Text fontSize='16px'>
                Jane Doe ★✰✰✰✰
              </Text>
            </HStack>
            <Text fontSize='12px'>
              I don't like hamburgers.
            </Text>

          </VStack>
        </Box>

        <Box>
          <VStack spacing ='24px' align = 'left'>
            <Text>
              [Q&A]
            </Text>
            <Box>
              <Text fontSize='14px'>
              Q: What kind of food do they sell?
              </Text>
              <Text fontSize='14px'>
              A: They have burgers, fries, salads, and milkshakes.
              </Text>
            </Box>
            <Box>
              <Text fontSize='14px'>
              Q: Should people with allergies avoid this restaurant?
              </Text>
              <Text fontSize='14px'>
              A: If you have a soy allergy, you might want to avoid this restaurant because they fry their french fries in soy oil.
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Flex>
    </>
  )
}

export default DetailPage;