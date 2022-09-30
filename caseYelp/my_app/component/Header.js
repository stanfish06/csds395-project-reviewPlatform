import React from "react";
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
    FiTag,
} from 'react-icons/fi';

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <>
            <Flex as='nav' align='center' justify='space-between' wrap='wrap' padding='1rem' bg='#0a304e' color='white' marginBotton='2rem' boxShadow='2xl'>
                <Flex align='center' mr={10}>
                    <Heading as='h1' size='lg' letterSpacing={'-.1rem'}>
                        CaseYelp
                    </Heading>
                </Flex>
                <Select variant='outline' bg='white' w='1000px' placeholder='Search options' color='black' icon={<Search2Icon />}>
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
                    <IconButton color='black' icon={<FiTag />} onClick={onOpen}></IconButton>
                    <IconButton color='black' icon={<BellIcon />}></IconButton>
                    <Menu>
                        <MenuButton
                            color='black'
                            as={IconButton}
                            aria-label='Options'
                            variant='unstyled'
                        >
                            <Box>
                                <Avatar size='sm'></Avatar>
                            </Box>
                        </MenuButton>
                        <MenuList color='black'>
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

                                <Input mb={5} placeholder='Editing your tags' />

                                <Box>
                                    {['Spicy', 'Sweet', 'Vegan'].map((type) => (
                                        <Tag
                                            size='sm'
                                            key={type}
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme='green'
                                            mr={1}
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

        </>
    )
}