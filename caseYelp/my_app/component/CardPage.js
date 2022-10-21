import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link,
    WrapItem,
    Wrap,
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
import Card from './Card';

export default function CardPage(_stores) {
    console.log(_stores._allStores)
    const [allStores, setAllStores] = useState(_stores._allStores)
    return (
        <Flex pos='sticky' width='100%' flexDir='row' justify='space-between' boxShadow='inner' bg='grey100'>
            <Wrap justify='center' spacing='50px'>
                {allStores.map((store) => (
                    <WrapItem p={50}>
                        <Card _store={store} />
                    </WrapItem>
                ))}
            </Wrap>
        </Flex>
    )
}