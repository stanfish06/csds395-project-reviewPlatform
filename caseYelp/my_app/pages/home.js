import React, { useState } from 'react';
import Card from "../component/Card";
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
import CardPage from '../component/CardPage';
import { getSession } from "next-auth/react";

function Home({ stores, _alltags, userInf }) {
  const [allStores, setAllStores] = useState(stores);
  const [alltags, setAlltags] = useState(_alltags);
  return (
    <>
      <Header tagContent={alltags} _userInf={userInf}/>
      <Flex flexDir='row' width='100%'>
        <Sidebar />
        <CardPage _allStores={allStores} allTags={alltags}/>
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

  const userInf = {Email: case_email, Image: user_image, Name: user_name, UserId: case_id}

  await prisma.User.upsert({
    where: {
      caseId: case_id,
    },
    create: {
      caseId: case_id,
      userName: user_name,
      profileImage: user_image,
    },
    update: {
      isFirstLogin: false,
    }
  })

  const stores_temp = await prisma.Store.findMany({
    orderBy: { storeId: 'asc' },
    include: {
      _count: {
        select: {
          history: true,
          users: true,
          reviews: true,
        },
      },
      features: true,
    },
  })

  const stores = stores_temp.map(obj => ({ ...obj, rate: obj._count.reviews == 0 ? 0 : obj.totalScore / obj._count.reviews }))

  const fav_stores_id = await prisma.User.findMany({
    where: {
      caseId: case_id,
    },
    select: {
      favStore: {
        select: {
          storeId: true,
        },
      },
    },
  })

  const map = new Map();
  const userStores = fav_stores_id[0].favStore
  for (let i = 0; i < userStores.length; i++) {
    map.set(userStores[i].storeId, i)
  }
  for (let i = 0; i < stores.length; i++) {
    if (map.has(stores[i].storeId)) {
      stores[i].fav = true
    }
    else {
      stores[i].fav = false
    }
  }

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
  return { props: { stores, _alltags, userInf } }
}

export default Home;