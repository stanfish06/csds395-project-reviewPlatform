import React, { useState } from 'react'
import { useRouter } from 'next/router'
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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiFilter,
} from 'react-icons/fi';
import Card from './Card';

export default function CardPage({ _allStores, allTags }) {
    const router = useRouter()
    const [allStores, setAllStores] = useState(_allStores)
    const [displayedStores, setDisplayedStores] = useState(allStores)
    const [tags, setTags] = useState(allTags)


    const handleCountry = async (country) => {
        console.log(tags)
        var newStoreList = []
        for (let i = 0; i < allStores.length; i++) {
            const store = allStores[i]
            const store_features = store.features
            for (let j = 0; j < store_features.length; j++) {
                const feature = store_features[j].tagName
                console.log(feature)
                if (feature === country) {
                    console.log(store)
                    newStoreList.push(store)
                }
            }
        }
        setDisplayedStores(newStoreList)
        console.log(displayedStores)
    }

    const handleRecommand = async () => {
        var newStoreList = []
        const map = new Map();
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i]
            if (tag.selected) {
                map.set(tag.tagName, i)
            }
        }
        for (let i = 0; i < allStores.length; i++) {
                const store = allStores[i]
                const store_features = store.features
                for (let j = 0; j < store_features.length; j++) {
                    const feature = store_features[j].tagName
                    console.log(feature)
                    if (map.has(feature)) {
                        console.log(store)
                        newStoreList.push(store)
                    }
                }
            }
        setDisplayedStores(newStoreList)
        console.log(displayedStores)
    }

    const handleFavorite = async () => {
        console.log(tags)
        var newStoreList = []
        for (let i = 0; i < allStores.length; i++) {
            const store = allStores[i]
            if (store.fav) {
                newStoreList.push(store)
            }
        }
        setDisplayedStores(newStoreList)
        console.log(displayedStores)
    }

    return (
        <Flex pos='sticky' width='100%' flexDir='column' justify='space-between' align='center' boxShadow='inner' bg='grey100'>
            <Flex width='10%' flexDir='column'>
                <Menu>
                    <MenuButton as={Button} rightIcon={<FiFilter />}>
                        Filter
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setDisplayedStores(allStores)}>
                            All
                        </MenuItem>
                        <MenuItem onClick={handleRecommand}>
                            Recommand for you
                        </MenuItem>
                        <MenuItem onClick={handleFavorite}>
                            Your favorite
                        </MenuItem>
                        <MenuItem onClick={() => handleCountry('Chinese')}>
                            Chinese food
                        </MenuItem>
                        <MenuItem onClick={() => handleCountry('Korean')}>
                            Korean food
                        </MenuItem>

                    </MenuList>
                </Menu>
            </Flex>
            <Wrap justify='space-around' spacing='10px' height='100%' key={displayedStores}>
                {displayedStores.map((store) => (
                    <WrapItem p={50}>
                        <Card _store={store} />
                    </WrapItem>
                ))}
            </Wrap>
        </Flex>
    )
}