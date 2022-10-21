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
  useBoolean
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { TiHeartOutline, TiHeart } from 'react-icons/Ti';
import { FiShoppingCart } from 'react-icons/fi';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Rating({ rating, numReviews }) {
  return (
    <Flex d="flex" alignItems="center" flexDir='row'>
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Flex>
  );
}

function ProductAddToCart(_store) {
  const router = useRouter()
  const [store, setStore] = useState(_store._store)
  const {
    storeId,
    storeName,
    website,
    phoneNum,
    location,
    totalScore,
    _count,
    rate,
    features,
    fav
  } = store
  const [flag, setFlag] = useBoolean(fav)


  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW={["85vw", "445px"]}
      minW={["85vw", "445px"]}
      borderWidth="1px"
      rounded="lg"
      backdropFilter='auto'
      backdropBlur='8px'
      shadow="lg"
      position="relative">
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
        <Box d="flex" alignItems="baseline">
          {data.isNew && (
            <Wrap>
              {features.map((tag) => (
                <WrapItem>
                  <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                    {tag.tagName}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Box>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated>
            {storeName}
          </Box>
          <Tooltip
            label="Check this resaurant!"
            bg="white"
            placement={'top'}
            color={'gray.800'}
            fontSize={'1.2em'}>
            <chakra.a href={'#'} display={'flex'}>
              <Button
                px={4}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                onClick={() => router.push(`/store?id=${storeId}`)}>
              View store
            </Button>
          </chakra.a>
        </Tooltip>
      </Flex>

      <Flex justifyContent="space-between" alignContent="center" mt={5}>
        <Rating rating={rate} numReviews={_count.reviews} />
        <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')} as='button' >
          <Icon as={flag ? TiHeart : TiHeartOutline} h={7} w={7} alignSelf={'center'} />
        </Box>
      </Flex>
    </Box>
    </Box >
  );
}

export default ProductAddToCart;