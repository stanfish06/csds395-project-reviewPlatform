import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    VStack,
    HStack,
    Button,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import prisma from '/lib/prisma';
import BurgerIcon from "../component/detailpagecomponents/testdata/burger.png"
import UserIcon from "../component/detailpagecomponents/testdata/user.png"


const storeDetail = (store) => {
    console.log(store)
    const storeInf = store.store
    const {
        storeId,
        storeName,
        website,
        phoneNum,
        location,
        totalScore,
        features,
        users,
        history,
        questions,
        reviews
    } = storeInf


    return (
        <>
            <Header />
            <Flex flexDir='row' width='100%'>
                <Sidebar />

                
                <Center>
                    <VStack spacing='24px'>
                        <Box> 
                        <HStack spacing='24px'>
                            <Box>
                            <Image src={BurgerIcon}/>
                            </Box>
                            <Heading as='h1' size='2xl' noOfLines={1}>
                                {storeName}
                            </Heading>
                        </HStack>
                        </Box>

                        <Box> 
                        <Text>
                            {location}
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
                            [Menu] (Example)
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
                            [Reviews] (Example)
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
                            [Q&A] (Example)
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
                </Center>
            </Flex>
        </>
    )
}

export async function getServerSideProps({ req, res, query }) {
    const { id } = query;
    const storeId = parseInt(id)
    const store = await prisma.Store.findUnique({
        where: {
            storeId: storeId,
        },
        include: {
            _count: {
                select: {
                    history: true,
                    users: true,
                    reviews: true,
                },
            },
            features: true,
            questions: true,
        },
    })
    return { props: { store } }
}

export default storeDetail;