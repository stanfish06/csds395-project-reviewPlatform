import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    VStack,
    HStack,
    Button,
    Spacer,
    Badge,
    useColorModeValue,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage
} from '@chakra-ui/react';
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import prisma from '/lib/prisma';
import BurgerIcon from "../component/detailpagecomponents/testdata/burger.png"
import UserIcon from "../component/detailpagecomponents/testdata/user.png"
import { getSession } from "next-auth/react";
import { Field, Form, Formik, select } from 'formik';
import * as Yup from "yup";
import FormData from 'form-data';

const storeDetail = ({ store, userInf, _alltags, reviews }) => {
    const [alltags, setAlltags] = useState(_alltags);
    const router = useRouter()
    const {
        storeId,
        storeName,
        website,
        phoneNum,
        location,
        totalScore,
        features,
        users,
        history,
        Textarea,
    } = store

    const {
        Name,
        UserId
    } = userInf

    console.log(reviews)

    const submitReview = async (reviewContent, rate, userId, storeId, userName) => {
        const response = await fetch('/api/review', {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                score: rate,
                review: reviewContent,
                storeId: storeId,
                userName: userName
            }),
        })
        router.reload(router.pathname)
    }

    return (
        <>
            <Header tagContent={alltags} _userInf={userInf}/>
            <Flex flexDir='row' width='100%'>
                <Sidebar />
                <Flex pos='sticky' width='100%' flexDir='column' justify='center' boxShadow='inner' bg='grey100' align='center'>
                    <VStack spacing='24px'>
                        <Box>
                            <HStack spacing='24px'>
                                <Box>
                                    <Image src={BurgerIcon} />
                                </Box>
                                <Heading as='h1' size='2xl' noOfLines={1}>
                                    {storeName}
                                </Heading>
                            </HStack>
                        </Box>

                        <Box>
                            <Text>
                                {location}
                            </Text>
                        </Box>

                        <Box>
                            <Text color='green'>
                                Open (10AM - 8PM)
                            </Text>
                        </Box>

                        <Box>
                            <Text>
                                CaseCash? X
                            </Text>
                        </Box>

                        <Box>
                            <VStack spacing='24px' align='left'>
                                <Text>
                                    [Menu] (Example)
                                </Text>
                            </VStack>
                        </Box>

                        <Box>
                            <VStack spacing='24px' align='left'>
                                <Box rounded={'lg'} bg='white' boxShadow={'lg'} p={8}>
                                    <Formik
                                        initialValues={{ Review: "", Rate: "" }}
                                        validationSchema={Yup.object({
                                            Review: Yup.string().required("Review cannot be empty"),
                                            Rate: Yup.string().required("Rating cannot be empty")
                                        })}
                                        onSubmit={(values, actions) => {
                                            submitReview(values.Review, values.Rate, UserId, storeId, Name)
                                            setTimeout(() => {
                                                actions.setSubmitting(false)
                                            }, 1000)
                                        }}>

                                        {(props) => (
                                            <Form>
                                                <Field name='Review'>
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.Review}>
                                                            <FormLabel>Review</FormLabel>
                                                            <Input {...field} placeholder='Review' />
                                                            <FormErrorMessage>{form.errors.Review}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field>
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.Rate && form.touched.Rate}>
                                                            <FormLabel>Rate</FormLabel>
                                                            <Field as="select" name="Rate">
                                                                <option value={-1} label="Select a score">
                                                                    Select a score{" "}
                                                                </option>
                                                                {[0, 1, 2, 3, 4, 5].map((num) =>
                                                                (<option>
                                                                    {num}
                                                                </option>))}
                                                            </Field>

                                                            <FormErrorMessage>{form.errors.Rate}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                                <Button
                                                    mt={4}
                                                    colorScheme='teal'
                                                    isLoading={props.isSubmitting}
                                                    type='submit'
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Box>

                                <VStack spacing='24px'>
                                    {reviews.map((review) => (
                                    <VStack align="left" justify="center" spacing='12px'>
                                        <HStack spacing='16px'>
                                            <Text>{review.authorName}</Text>
                                            <Text>{review.score}</Text>
                                        </HStack>
                                        <Text >{review.review}</Text>
                                    </VStack>
                                    ))}
                                </VStack>
                            </VStack>
                        </Box>
                    </VStack>
                </Flex>
            </Flex>
        </>
    )
}

export async function getServerSideProps({ req, res, query }) {
    const session = await getSession({ req });

    const case_email = session.user.email
    const user_image = session.user.image
    const user_name = session.user.name
    const case_id = case_email.substr(0, case_email.indexOf('@'));

    const userInf = {Email: case_email, Image: user_image, Name: user_name, UserId: case_id}

    const { id } = query;
    const storeId = parseInt(id)
    const store = await prisma.Store.findUnique({
        where: {
            storeId: storeId,
        },
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
    const reviews = await prisma.Review.findMany({
        where: {
            storeId: storeId
        },
        select: {
            review: true,
            authorName: true,
            score: true
        }
    })
    const map = new Map();
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
    return { props: { store, userInf, _alltags, reviews } }
}

export default storeDetail;