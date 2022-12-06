import React, { useState } from 'react';
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import prisma from '/lib/prisma';
import {
    Grid,
    GridItem,
    Flex,
    Center,
    Box,
    IconButton,
    Heading,
    Spacer,
    ButtonGroup,
    Select,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Tabs,
    Wrap,
    WrapItem,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure,
    Input,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    AddIcon,
    Avatar,
    AvatarBadge,
    AvatarGroup,
    Tag,
    Badge,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    AspectRatio,
    Image,
    NextLink,
    Link,
    Stack,
    Text,
    useCheckboxGroup
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { getSession } from "next-auth/react";

function Profile({ userInf, _alltags }) {
    const [alltags, setAlltags] = useState(_alltags);
    return (
        <>
        <Header tagContent={alltags} _userInf={userInf}/>
            <Flex flexDir='row' width='100%'>
            <Sidebar />
                <Center width='75%' margin={5} pos='sticky' bg='grey100'>
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
                                src={userInf.Image}
                                alt={'Author'}
                                css={{
                                    border: '2px solid white',
                                }}
                            />
                        </Flex>

                        <Box p={6}>
                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                    {userInf.Name}
                                </Heading>
                                <Text color={'gray.500'}>{userInf.UserId}</Text>
                            </Stack>

                            <Stack direction={'row'} justify={'center'} spacing={6}>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontWeight={600}>{userInf.NumReview}</Text>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        reviews
                                    </Text>
                                </Stack>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontWeight={600}>{userInf.NumHistory}</Text>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        stores visited
                                    </Text>
                                </Stack>
                            </Stack>

                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'m'} fontWeight={250} fontFamily={'body'}>
                                    joined Case Review since
                                </Heading>
                                <Text color={'gray.500'}>{userInf.Time}</Text>
                            </Stack>

                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'m'} fontWeight={250} fontFamily={'body'}>
                                    Your favorite is:
                                </Heading>
                                <Wrap>
                                    {userInf.Tag.map((tag) => (
                                        <WrapItem>
                                            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                                                {tag.tagName}
                                            </Badge>
                                        </WrapItem>
                                    ))}
                                </Wrap>
                            </Stack>

                            <Link href='/home' isExternal>
                                Not your fav? Click to change<ExternalLinkIcon mx='2px' />
                            </Link>
                        </Box>
                    </Box>
                </Center>
            </Flex>
        </>
    )
}


export const getServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

    const case_email = session.user.email
    const user_image = session.user.image
    const user_name = session.user.name
    const case_id = case_email.substr(0, case_email.indexOf('@'));

    const map = new Map();
    const userStats = await prisma.User.findMany({
        where: {
            caseId: case_id,
        },
        include: {
            _count: {
                select: {
                    viewHistory: true,
                    reviews: true,
                }
            }
        }
    })

    const userCreateTime = await prisma.User.findUnique({
        where: {
            caseId: case_id,
        },
        select: {
            createTime: true,
        }
    })

    const tags = await prisma.User.findMany({
        where: {
            caseId: case_id,
        },
        select: {
            tags: {
                select: {
                    tagId: true,
                    tagName: true,
                }
            },
        },
    })
    const alltags = await prisma.Tag.findMany({
        distinct: ['tagId'],
        select: {
            tagId: true,
            tagName: true,
        },
    })
    const userTags = tags[0].tags

    for (let i = 0; i < userTags.length; i++) {
        map.set(userTags[i].tagId, i)
    }
    for (let i = 0; i < alltags.length; i++) {
        alltags[i].userId = case_id
        if (map.has(alltags[i].tagId)) {
            alltags[i].selected = true
        }
        else {
            alltags[i].selected = false
        }
    }
    const _alltags = alltags

    const user_tag = userTags
    var user_createTime = JSON.stringify(userCreateTime.createTime)


    const userInf = { Email: case_email, Image: user_image, Name: user_name, UserId: case_id, Time: user_createTime.slice(1, 11), Tag: user_tag, NumHistory: userStats[0]._count.viewHistory, NumReview: userStats[0]._count.reviews }

    console.log(userInf)

    return { props: { userInf, _alltags } }
}


export default Profile;