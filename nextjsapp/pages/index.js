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
    Text
} from '@chakra-ui/react'
import { Search2Icon, HamburgerIcon, BellIcon, StarIcon } from '@chakra-ui/icons'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useState } from 'react';
import React, { ReactNode } from 'react';
import prisma from '../lib/prisma';
import { useRouter } from 'next/router';


const sidebar = [
    { name: 'Home', icon: FiHome },
    { name: 'My questions', icon: FiTrendingUp },
    { name: 'My reviews', icon: FiCompass },
    { name: 'My restaurants', icon: FiStar },
    { name: 'Ask a question', icon: FiSettings },
    { name: 'Find resaurants', icon: FiSettings },
    { name: 'Find posts', icon: FiSettings }
];

const IndexPage = ({ _stores }) => {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [stores, setStores] = useState(_stores)


    return (
        <Grid
            templateAreas={`"header header"
                  "nav main"`}
            gridTemplateRows={'100px 1fr 100px'}
            gridTemplateColumns={'150px 1fr'}
            h='200px'
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
        >
            <GridItem pl='0' bg='white' area={'header'}>
                <Flex minWidth='max-content' alignItems='center' gap='2' boxShadow='2xl'>
                    <Box p={2}>
                        <Heading>Case Review</Heading>
                    </Box>
                    <Select variant='filled' placeholder='Search restaurants' icon={<Search2Icon />}>
                        <option value='option1'>Personal favorites</option>
                        <option value='option2'>Picked for you</option>
                        <option value='option3'>Viewed before</option>
                        <option value='option2'>Local hotspots</option>
                        <option value='option4'>Chinese</option>
                        <option value='option5'>Maxican</option>
                        <option value='option6'>American</option>
                        <option value='option7'>Japanese</option>
                    </Select>
                    <ButtonGroup gap='1'>
                        <IconButton icon={<HamburgerIcon />} onClick={onOpen}></IconButton>
                        <IconButton icon={<BellIcon />}></IconButton>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                variant='unstyled'
                            >
                                <Box>
                                    <Avatar size='sm'></Avatar>
                                </Box>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    My account
                                </MenuItem>
                                <MenuItem onClick={onOpen}>
                                    My tags
                                </MenuItem>
                            </MenuList>
                        </Menu>


                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Tag</DrawerHeader>

                                <DrawerBody>

                                    <Input placeholder='Editing your tags' />

                                    <Box>
                                        {['Spicy', 'Sweet', 'Vegan'].map((type) => (
                                            <Tag
                                                size='sm'
                                                key={type}
                                                borderRadius='full'
                                                variant='solid'
                                                colorScheme='green'
                                            >
                                                <TagLabel>{type}</TagLabel>
                                                <TagCloseButton />
                                            </Tag>
                                        ))}
                                    </Box>
                                </DrawerBody>

                                <DrawerFooter>
                                    <Button variant='outline' mr={3} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='blue'>Save</Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </ButtonGroup>
                </Flex>
            </GridItem>
            <GridItem pl='0' bg='white' area={'nav'}>
                <Box
                    pos="fixed"
                    boxShadow='lg'
                    minH="100vh"
                    bg={useColorModeValue('gray.100', 'gray.900')}
                    h="full">
                    {sidebar.map((link) => (
                        <Link href='/' style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                            <Flex align="center"
                                p="7"
                                mx="1"
                                borderRadius="lg"
                                role="group"
                                cursor="pointer"
                                _hover={{
                                    bg: 'cyan.400',
                                    color: 'white',
                                }}
                                key={link.name}
                                icon={link.icon}>
                                {link.name}
                            </Flex>
                        </Link>
                    ))}
                </Box>
            </GridItem>
            <GridItem pl='2' bg='white' area={'main'}>
                <Flex justify="space-between"
                    align="center"
                    direction="column"
                    h="full"
                    w="full"
                    p={2}
                    overflowX="hidden"
                    overflowY={"scroll"}
                    pos="relative"
                    gap={4}>
                    {stores.map((store) => (
                        <Box maxW='200px' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='base'>
                            <Image src={'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/800px-Chipotle_Mexican_Grill_logo.svg.png'} />

                            <Box p='6'>
                                <Box display='flex' alignItems='baseline'>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='s'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {store.storeName}
                                    </Box>
                                </Box>

                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={2}
                                >
                                    {store.storeName}
                                </Box>

                                <Box display='flex' mt='2' alignItems='center'>
                                    {[1, 2, 3].map((i) => (
                                        <StarIcon
                                            key={i}
                                            color={i < 4 ? 'teal.500' : 'gray.300'}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Flex>

            </GridItem>
        </Grid>
    )
}

const card = () => {
    return (
        <Box
            maxW={'445px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Box
                h={'210px'}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}>
                <Image
                    src={
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1024px-McDonald%27s_Golden_Arches.svg.png'
                    }
                    layout={'fill'}
                />
            </Box>
            <Stack>
                <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}>
                    Blog
                </Text>
                <Heading
                    color={useColorModeValue('gray.700', 'white')}
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    Boost your conversion rate
                </Heading>
                <Text color={'gray.500'}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum.
                </Text>
            </Stack>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Avatar
                    src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                    alt={'Author'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>Achim Rolle</Text>
                    <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                </Stack>
            </Stack>
        </Box>
    )
}

export const getServerSideProps = async ({ req, res }) => {

    const _stores = await prisma.Store.findMany({
        orderBy: { storeId: 'asc' },
        include: {
            _count: {
                select: {
                    history: true,
                    users: true,
                    reviews: true,
                },
            },
        },
    })
    console.log(_stores)
    return { props: { _stores } }
}

export default IndexPage;