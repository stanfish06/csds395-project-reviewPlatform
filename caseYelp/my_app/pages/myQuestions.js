import React, { useState } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import prisma from "/lib/prisma";
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
  useCheckboxGroup,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import QuestionCardPage from "../component/QuestionCardPage";
import { Search2Icon, BellIcon, SmallAddIcon } from "@chakra-ui/icons";
import { FiTag } from "react-icons/fi";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

function MyQuestions({ questions }) {
  const [allQuestions, setAllQuestions] = useState(questions);
  const btnRef = React.useRef();
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  return (
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
      <Flex flexDir="row" width="100%">
        <Sidebar />
        <QuestionCardPage _allQuestions={allQuestions} />
      </Flex>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  const case_email = session.user.email;
  const user_image = session.user.image;
  const user_name = session.user.name;
  const case_id = case_email.substr(0, case_email.indexOf("@"));

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
    },
  });

  const questions_temp = await prisma.Question.findMany({
    where: {
      userId: case_id,
    },
    orderBy: { questionId: "asc" },
    include: {
      _count: {
        select: {
          answers: true,
        },
      },
      askedBy: true,
      askStore: true,
    },
  });

  const questions = questions_temp.map((obj) => ({
    ...obj,
  }));

  return { props: { questions: JSON.parse(JSON.stringify(questions)) } };
};

export default MyQuestions;
