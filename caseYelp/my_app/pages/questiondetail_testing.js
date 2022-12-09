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
    Icon,
    Badge,
    useColorModeValue,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useBoolean,
    Tooltip,
    chakra,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    IconButton
} from '@chakra-ui/react';
import Header from "../component/Header";
import { DeleteIcon } from '@chakra-ui/icons'
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
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { TiHeartOutline, TiHeart } from 'react-icons/Ti';

const questionDetail = ({ _question, question_inf, userInf, answers, _alltags }) => {

    const router = useRouter();
    let {
        questionId,
        question,
        userId,
        publisherName
    } = question_inf;
    if (question_inf.publisherName == "") {
        publisherName = userId;
    }
    const {
        _count,
        askedAt
    } = _question;
    let askedAtDate = askedAt.toString().substring(1, 11);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()


    answers.map((answer) => {
        answer.answeredAt = answer.answeredAt.substring(1, 11);
    })

    const {
        Name,
        UserId
    } = userInf
    const [alltags, setAlltags] = useState(_alltags);

    const submitAnswer = async (answerContent, userId, questionId, userName) => {
        let date = new Date().toJSON();
        const response = await fetch('/api/answer', {
            method: 'POST',
            body: JSON.stringify({
                answer: answerContent,
                answeredAt: date,
                userId: userId,
                publisherName: userName,
                questionId: questionId
            }),
        })
        router.reload(router.pathname)
    }

    const deleteQuestion = async () => {
        const response = await fetch('/api/deleteQuestion', {
            method: 'POST',
            body: JSON.stringify({
                questionId: questionId
            }),
        })
        onClose()
        router.push('/home_testing')
    }

    return (
        <>
            <Header tagContent={alltags} _userInf={userInf} />
            <Flex flexDir="row" width="100%">
                <Sidebar />
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete question
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={deleteQuestion} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
                <Box p="6">
                    <Flex mt="1" justifyContent="space-between" alignContent="center" flexDir="column">
                        <Box
                            fontSize="xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {question}
                        </Box>
                        <Box
                            fontSize="x2"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {publisherName}
                        </Box>
                        <Box
                            fontSize="x2"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {askedAtDate}
                        </Box>
                        <IconButton
                            colorScheme='red'
                            onClick={onOpen}
                            visibility={() => (userId === UserId ? 'visible' : 'hidden')}
                            icon={<DeleteIcon />}
                        />
                    </Flex>
                </Box>

                <Box>
                    <VStack spacing='24px' align='left'>
                        <Box rounded={'lg'} bg='white' boxShadow={'lg'} p={8}>
                            <Formik
                                initialValues={{ Answer: "" }}
                                validationSch={Yup.object({
                                    Answer: Yup.string().required("Answer cannot be empty"),

                                })}
                                onSubmit={(values, actions) => {
                                    submitAnswer(values.Answer, UserId, questionId, Name)
                                    setTimeout(() => {
                                        actions.setSubmitting(false)
                                    }, 1000)
                                }}>

                                {(props) => (
                                    <Form>
                                        <Field name='Answer'>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.Review}>
                                                    <FormLabel>Answer</FormLabel>
                                                    <Input {...field} placeholder='Answer' />
                                                    <FormErrorMessage>{form.errors.Review}</FormErrorMessage>
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
                            {answers.map((answer) => (
                                <VStack align="left" justify="center" spacing='12px' minWidth='900px' maxWidth='900px'>
                                    <Box rounded={'lg'} bg='white' boxShadow={'lg'} p={8}>
                                        <HStack spacing='16px'>
                                            <Text fontSize="20px" bold="true">{answer.userId}</Text>
                                        </HStack>

                                        <hr />
                                        <Text>{answer.answer}</Text>
                                    </Box>
                                </VStack>
                            ))}
                        </VStack>
                    </VStack>
                </Box>
            </Flex>


        </>
    )
}

export async function getServerSideProps({ req, res, query }) {
    const session = await getSession({ req });

    const case_email = 'zxy441@case.edu'
    const user_image = ''
    const user_name = 'Zhiyuan Yu'
    const case_id = case_email.substr(0, case_email.indexOf('@'));

    const userInf = { Email: case_email, Image: user_image, Name: user_name, UserId: case_id }
    const { id } = query;
    const questionId = parseInt(id)

    const _question = await prisma.Question.findUnique({
        where: {
            questionId: questionId,
        },
        include: {
            _count: {
                select: {
                    answers: true,
                },
            },
        }
    })

    _question.askedAt = JSON.stringify(_question.askedAt)
    console.log(_question)

    const question_inf = await prisma.Question.findUnique({
        where: {
            questionId: questionId,
        },
        select: {
            questionId: true,
            question: true,
            storeId: true,
            storeName: true,
            userId: true,
            publisherName: true
        }
    })

    const answers = await prisma.Answer.findMany({
        where: {
            questionId: questionId
        },
        /*select: {
            answer: true,
            userId: true
        }*/
    })
    answers.forEach(async (answer) => {
        answer.answeredAt = JSON.stringify(answer.answeredAt);
        publisherName = await prisma.User.findUnique({
            where: {
                userId: answer.userId
            },
            select: {
                userName: true
            }
        })
    });

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

    return { props: { _question, question_inf, userInf, _alltags, answers } }
}
export default questionDetail;