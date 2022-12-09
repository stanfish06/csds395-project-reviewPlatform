import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Wrap,
  WrapItem,
  IconButton,
  Button,
  useBoolean,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { TiHeartOutline, TiHeart } from "react-icons/Ti";
import { FiShoppingCart } from "react-icons/fi";
import React, { useState } from "react";
import { useRouter } from "next/router";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};


function Answers({ question, answers, numAnswers, questionId }) {
  const router = useRouter();
  if (numAnswers == 0) {
    return (
      <Flex mt="1" justifyContent="space-between" alignContent="center">
        <Flex direction="column" gap="3">
          <Box
            fontSize="xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {question}
          </Box>
          <Box textAlign="left" textColor="gray.500" align="center">
            No Answers Yet
          </Box>
        </Flex>
        <Tooltip
          label="Check out this question!"
          bg="white"
          placement={"top"}
          color={"gray.800"}
          fontSize={"1.2em"}
        >
          <chakra.a href={"#"} display={"flex"}>
            <Button
              px={4}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              onClick={() => router.push(`/questiondetail_testing?id=${questionId}`)}
            >
              Write an Answer
            </Button>
          </chakra.a>
        </Tooltip>
      </Flex>
    );
  } else {
    return (
      <Flex mt="1" justifyContent="space-between" alignContent="center">
        <Flex direction="column" gap="3">
          <Box
            fontSize="xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {question}
          </Box>
          <Box textAlign="left" textColor="blue.400" align="center">
            {numAnswers} Answers
          </Box>
        </Flex>
        <Tooltip
          label="Check out this question!"
          bg="white"
          placement={"top"}
          color={"gray.800"}
          fontSize={"1.2em"}
        >
          <chakra.a href={"#"} display={"flex"}>
            <Button
              px={4}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              onClick={() => router.push(`/questiondetail_testing?id=${questionId}`)}
            >
              View Answers
            </Button>
          </chakra.a>
        </Tooltip>
      </Flex>
    );
  }
}

function ProductAddToCart(_question) {
  const router = useRouter();
  const [questionq, setQuestion] = useState(_question._question);
  const { questionId, question, answers, numAnswers, _count } = questionq;
  // const [flag, setFlag] = useBoolean(fav)


  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      maxW={["85vw", "445px"]}
      minW={["85vw", "445px"]}
      borderWidth="1px"
      rounded="lg"
      backdropFilter="auto"
      backdropBlur="8px"
      shadow="lg"
      position="relative"
    >



      <Image
      // add image to database
      />

      <Box p="6">
        <Answers
          question={question}
          answers={answers}
          numAnswers={_count.answers}
          questionId={questionId}
        />
      </Box>
    </Box>
  );
}

export default ProductAddToCart;
