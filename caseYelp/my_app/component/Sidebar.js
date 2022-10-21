import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link,
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import NavItem from './NavItem';

export default function Sidebar(content) {
    const [navSize, setNavSize] = useState('expand')
    return (
        <Flex pos='sticky' left='0' h='90vh' boxShadow='xl' flexDir='column' borderRadius={navSize === 'expand' ? '30px' : '15px'} w={navSize === 'expand' ? '200px' : '45px'}>
            <Flex p='5%' flexDir='column' alignItems='flex-start' as='nav'>
                <IconButton bg='none' _hover={{ bg: 'none' }} mt={5} icon={<FiMenu />} onClick={() => navSize === 'expand' ? setNavSize('shrink') : setNavSize('expand')} />
                <NavItem navSize={navSize} />
            </Flex>
        </Flex>
    )
}