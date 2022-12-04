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

//   function Rating({ rating, numReviews }) {
//     return (
//       <Flex d="flex" alignItems="center" flexDir='row'>
//         {Array(5)
//           .fill('')
//           .map((_, i) => {
//             const roundedRating = Math.round(rating * 2) / 2;
//             if (roundedRating - i >= 1) {
//               return (
//                 <BsStarFill
//                   key={i}
//                   style={{ marginLeft: '1' }}
//                   color={i < rating ? 'teal.500' : 'gray.300'}
//                 />
//               );
//             }
//             if (roundedRating - i === 0.5) {
//               return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
//             }
//             return <BsStar key={i} style={{ marginLeft: '1' }} />;
//           })}
//         <Box as="span" ml="2" color="gray.600" fontSize="sm">
//           {numReviews} review{numReviews > 1 && 's'}
//         </Box>
//       </Flex>
//     );
//   }

function Answers({ answers, numAnswers }) {
  if (numAnswers == 0) {
    return (
      <chakra.a href={"#"} display={"flex"}>
        <Button
          px={4}
          fontSize={"sm"}
          rounded={"full"}
          bg={"gray.400"}
          color={"white"}
          //   boxShadow={
          //     "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          //   }
          _hover={{
            bg: "gray.500",
          }}
          _focus={{
            bg: "gray.500",
          }}
        >
          No Answers Yet
        </Button>
      </chakra.a>
    );
  } else {
    return (
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
          onClick={() => router.push(`/question?id=${questionId}`)}
        >
          View {numAnswers} answers
        </Button>
      </chakra.a>
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
      {data.isNew && (
        <Circle
          size="10px"
          position="absolute"
          top={2}
          right={2}
          bg="blue.200"
        />
      )}

      <Image
      // add image to database
      />

      <Box p="6">
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {question}
          </Box>
          <Tooltip
            label="Check out this question!"
            bg="white"
            placement={"top"}
            color={"gray.800"}
            fontSize={"1.2em"}
          >
            <Answers answers={answers} numAnswers={_count.answers} />
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProductAddToCart;
