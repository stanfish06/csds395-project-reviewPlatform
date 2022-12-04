import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import Card from "./QuestionCard";

export default function CardPage(_questions) {
  console.log(_questions._allQuestions);
  const [allQuestions, setAllQuestions] = useState(_questions._allQuestions);
  return (
    <Flex
      pos="sticky"
      width="100%"
      flexDir="row"
      justify="space-between"
      boxShadow="inner"
      bg="grey100"
    >
      <Wrap justify="center" spacing="20px">
        {allQuestions.map((question) => (
          <WrapItem p={50}>
            <Card _question={question} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
}
