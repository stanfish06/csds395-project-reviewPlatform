import React, { useState, useParams } from "react";
import Sidebar from "../component/Sidebar";
import prisma from "/lib/prisma";
import { Flex } from "@chakra-ui/react";
import CardPage from "../component/CardPage";
import {
  Box,
  IconButton,
  Heading,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Tag,
  TagLabel,
  TagCloseButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon, BellIcon, SmallAddIcon } from "@chakra-ui/icons";
import { FiTag } from "react-icons/fi";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

function Search({ stores, _alltags }) {
  const [allStores, setAllStores] = useState(stores);
  const [alltags, setAlltags] = useState(_alltags);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchTags = async () => {
    console.log("stan");
    const response = await fetch("/api/tag");
    const data = await response.json();
    const alltags = data[1];
    const userTags = data[0][0].tags;

    const map = new Map();
    console.log(data[0][0].tags);
    for (let i = 0; i < userTags.length; i++) {
      map.set(userTags[i].tagId, i);
    }
    for (let i = 0; i < alltags.length; i++) {
      if (map.has(alltags[i].tagId)) {
        alltags[i].selected = true;
      } else {
        alltags[i].selected = false;
      }
    }
    console.log(alltags);

    setTags(alltags);
    onOpen();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(keyword);
    router.push(`/search?term=${keyword}`);
    window.location.replace(`/search?term=${keyword}`);
    setKeyword("");
  };
  return (
    <>
      <>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1rem"
          bg="#0a304e"
          color="white"
          marginBotton="2rem"
          boxShadow="Base"
        >
          <Flex align="center" mr={10}>
            <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
              CaseYelp
            </Heading>
          </Flex>
          <form
            style={{ width: "70%" }}
            id="keywordSearch"
            onSubmit={handleSubmit}
          >
            <InputGroup>
              <Input
                variant="outline"
                bg="white"
                placeholder="Search for restaurants"
                color="black"
                id="searchText"
                type="text"
                onChange={(event) => setKeyword(event.currentTarget.value)}
              />
              <InputRightElement>
                <IconButton
                  aria-label="A"
                  color="Black"
                  icon={<Search2Icon />}
                  type="submit"
                ></IconButton>
              </InputRightElement>
            </InputGroup>
          </form>
          <ButtonGroup gap="1">
            <IconButton
              color="black"
              icon={<FiTag />}
              onClick={fetchTags}
            ></IconButton>
            <IconButton color="black" icon={<BellIcon />}></IconButton>
            <Menu>
              <MenuButton
                color="black"
                as={IconButton}
                aria-label="Options"
                variant="unstyled"
              >
                <Box>
                  <Avatar size="sm"></Avatar>
                </Box>
              </MenuButton>
              <MenuList color="black">
                <MenuItem onClick={() => router.push("/profile")}>
                  My account
                </MenuItem>
                <MenuItem>My tags</MenuItem>
              </MenuList>
            </Menu>

            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
              onOpen={fetchTags}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Tag</DrawerHeader>

                <DrawerBody>
                  <Box>
                    {tags.map((tag) =>
                      tag.selected ? (
                        <Tag
                          size="sm"
                          key={tag.tagId}
                          borderRadius="full"
                          variant="solid"
                          colorScheme="green"
                          mr={1}
                        >
                          <TagLabel>{tag.tagName}</TagLabel>
                          <TagCloseButton
                            onClick={() => {
                              setTags(
                                tags.map((item) =>
                                  item.tagId === tag.tagId
                                    ? { ...item, selected: false }
                                    : { ...item }
                                )
                              );
                            }}
                          />
                        </Tag>
                      ) : (
                        <Tag
                          size="sm"
                          key={tag.tagId}
                          borderRadius="full"
                          variant="solid"
                          colorScheme="red"
                          mr={1}
                        >
                          <TagLabel>{tag.tagName}</TagLabel>
                          <IconButton
                            color="black"
                            icon={<SmallAddIcon />}
                            size="24px"
                            ml={2}
                            onClick={() => {
                              setTags(
                                tags.map((item) =>
                                  item.tagId === tag.tagId
                                    ? { ...item, selected: true }
                                    : { ...item }
                                )
                              );
                            }}
                          />
                        </Tag>
                      )
                    )}
                  </Box>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </ButtonGroup>
        </Flex>
      </>
      <Flex flexDir="row" width="100%">
        <Sidebar />
        <CardPage _allStores={allStores} allTags={alltags} />
      </Flex>
    </>
  );
}

export const getServerSideProps = async ({ query: { term }, req }) => {
  const session = await getSession({ req });

  const case_email = session.user.email
  const user_image = session.user.image
  const user_name = session.user.name
  const case_id = case_email.substr(0, case_email.indexOf('@'));
  const stores_temp = await prisma.Store.findMany({
    where: {
      storeName: {
        contains: term,
        mode: "insensitive",
      },
    },
    orderBy: { storeId: "asc" },
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
  });

  const stores = stores_temp.map((obj) => ({
    ...obj,
    rate: obj._count.reviews == 0 ? 0 : obj.totalScore / obj._count.reviews,
  }));

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
  });

  const map = new Map();
  const userStores = fav_stores_id[0].favStore;
  for (let i = 0; i < userStores.length; i++) {
    map.set(userStores[i].storeId, i);
  }
  for (let i = 0; i < stores.length; i++) {
    if (map.has(stores[i].storeId)) {
      stores[i].fav = true;
    } else {
      stores[i].fav = false;
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

  console.log(stores);
  return { props: { stores, _alltags } };
};

export default Search;
