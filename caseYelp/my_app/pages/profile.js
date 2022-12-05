import React, { useState } from 'react';
import prisma from '/lib/prisma';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import { getSession } from "next-auth/react";

function Profile({ userInf }) {
    const { 
        Email,
        Image,
        Name,
        UserId,
        Time,
        Tag,
        NumHistory,
        NumReview,
    } = userInf
    return (
        <>
            <Header />
            <Flex flexDir='row' width='100%'>
                <Sidebar />
                <Center width='75%' margin={5} pos='sticky' bg='grey'>
                    <Box
                        maxW={'270px'}
                        w={'full'}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Image
                            h={'120px'}
                            w={'full'}
                            src=
                            {'https://images.adsttc.com/media/images/5721/c139/e58e/ce5c/ad00/001a/large_jpg/CASE_ex_js_3256.jpg?1461829933'}
                            objectFit={'cover'}
                        />
                        <Flex justify={'center'} mt={-12}>
                            <Avatar
                                size={'xl'}
                                src={
                                    '{Image}'
                                }
                                alt={'Author'}
                                css={{
                                    border: '2px solid white',
                                }}
                            />
                        </Flex>

                        <Box p={6}>
                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                  {Name}
                                </Heading>
                              <Text color={'gray.500'}>{ UserId}</Text>
                            </Stack>

                            <Stack direction={'row'} justify={'center'} spacing={6}>
                                <Stack spacing={0} align={'center'}>
                                  <Text fontWeight={600}>{NumReview}</Text>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        reviews
                                    </Text>
                                </Stack>
                                <Stack spacing={0} align={'center'}>
                                  <Text fontWeight={600}>{NumHistory}</Text>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        stores visited
                                    </Text>
                                </Stack>
                            </Stack>

                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'m'} fontWeight={250} fontFamily={'body'}>
                                    joined Case Review since
                                </Heading>
                              <Text color={'gray.500'}>{Time}</Text>
                            </Stack>

                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'m'} fontWeight={250} fontFamily={'body'}>
                                    Your favorite is:
                                </Heading>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    {Tag}
                                </Badge>
                            </Stack>
                            
                            <Link href='/home' isExternal>
                                 Not your fav? Click to change<ExternalLInkIcon mx = '2px' />
                            </Link>
                        </Box>
                    </Box>
                </Center>
            </Flex>
        </>
    );
}

export const getServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

    const case_email = session.user.email
    const user_image = session.user.image
    const user_name = session.user.name
    const user_tag = session.user.tags
    const user_createTime = session.user.createTime
    const case_id = case_email.substr(0, case_email.indexOf('@'));

    const numReview = await prisma.User.findMany({
        where: {
            caseId: case_id,
        },
        include: {
            _count: {
                select: {
                    reviews: true,
                }
            }
        } 
    })

    const numHistory = await prisma.User.findMany({
        where: {
            caseId: case_id,
        },
        include: {
            _count: {
                select: {
                    viewHistory: true,
                }
            }
        } 
    })
    
    const userInf = { Email: case_email, Image: user_image, Name: user_name, UserId: case_id, Time: user_createTime, Tag: user_tag, NumHistory: numHistory, NumReview: numReview }
    
    return { props: { userInf } }
}
export default Profile;