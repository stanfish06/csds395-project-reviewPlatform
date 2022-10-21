import React, { useState } from 'react'
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
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiSearch,
} from 'react-icons/fi';
import {
    RiQuestionLine,
    RiQuestionAnswerFill,

} from 'react-icons/Ri';
import {
    MdOutlineRateReview,

} from 'react-icons/Md';
import {
    VscPreview,

} from 'react-icons/Vsc';
import {
    BsFilePost,

} from 'react-icons/Bs';

export default function NavItem(navSize) {
    const active = navSize.navSize === 'expand'
    const sidebar = [
        { name: 'Home', icon: FiHome , link: '/home'},
        { name: 'My questions', icon: RiQuestionLine, link: '/'},
        { name: 'My reviews', icon: VscPreview, link: '/'},
        { name: 'Ask a question', icon: RiQuestionAnswerFill, link: '/'},
        { name: 'Write a review', icon: MdOutlineRateReview, link: '/'},
        { name: 'Search resaurants', icon: FiSearch, link: '/'},
        { name: 'Find posts', icon: BsFilePost, link: '/'}
    ];
    return (
        <Flex mt={30} w='100%' flexDir='column' alignItems={active ? 'flex-start':'center'}>
            {sidebar.map((item) => (
                <Link href={item.link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                    <Flex align="center"
                        p="4"
                        mx="1"
                        borderRadius="lg"
                        role="group"
                        cursor="pointer"
                        _hover={{
                            bg: '#626262',
                            color: 'white',
                        }} flexDir='row' justifyItems='space-between'>
                        <Icon as={item.icon} />
                        <Text display={active ? 'flex':'none'} ml={5}>{item.name}</Text>
                    </Flex>
                </Link>
            ))}
        </Flex>)
}