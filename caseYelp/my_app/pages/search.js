import React, { useState, useParams } from "react";
import Sidebar from "../component/Sidebar";
import prisma from "/lib/prisma";
import {
  Center,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverContent,
  Portal,
} from "@chakra-ui/react";
import Header from "../component/Header";
import CardPage from "../component/CardPage";
import QuestionCardPage from "../component/QuestionCardPage";
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

function Search({ stores, _alltags, questions, userInf }) {
  const [allStores, setAllStores] = useState(stores);
  const [allQuestions, setAllQuestions] = useState(questions);
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
      <Header tagContent={alltags} _userInf={userInf} />
      <Popover
        isOpen="true"
        placement="top-start"
        width="100%"
        alignItems="center"
      >
        <PopoverContent w="full" ml="300" mr="300" mt="4">
          <form
            style={{ width: "100%" }}
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
        </PopoverContent>
      </Popover>

      <Portal></Portal>
      <Flex flexDir="row" width="100%">
        <Sidebar />
        <CardPage _allStores={allStores} allTags={alltags} />
        <QuestionCardPage _allQuestions={allQuestions} />
      </Flex>
    </>
  );
}

export const getServerSideProps = async ({ query: { term }, req }) => {
  const session = await getSession({ req });

  const case_email = session.user.email;
  const user_image = session.user.image;
  const user_name = session.user.name;
  const case_id = case_email.substr(0, case_email.indexOf("@"));
  const userInf = {
    Email: case_email,
    Image: user_image,
    Name: user_name,
    UserId: case_id,
  };

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

  // question
  const questions_temp = await prisma.Question.findMany({
    where: {
      question: {
        contains: term,
        mode: "insensitive",
      },
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

  // store
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
          questions: true,
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
        },
      },
    },
  });
  const alltags = await prisma.Tag.findMany({
    distinct: ["tagId"],
    select: {
      tagId: true,
      tagName: true,
    },
  });
  const userTags = tags[0].tags;

  for (let i = 0; i < userTags.length; i++) {
    map.set(userTags[i].tagId, i);
  }
  for (let i = 0; i < alltags.length; i++) {
    alltags[i].userId = case_id;
    if (map.has(alltags[i].tagId)) {
      alltags[i].selected = true;
    } else {
      alltags[i].selected = false;
    }
  }
  const _alltags = alltags;

  console.log(stores);
  return {
    props: {
      stores: JSON.parse(JSON.stringify(stores)),
      _alltags,
      questions: JSON.parse(JSON.stringify(questions)),
      userInf,
    },
  };
};

export default Search;
