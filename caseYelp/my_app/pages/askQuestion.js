import React, { useState } from 'react';
import Card from "../component/Card";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    DrawerCloseButton,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    Select,
    Flex,
    Box,
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
    Textarea,
    color,
} from '@chakra-ui/react'

import { getSession } from "next-auth/react";
import { Field, Form, Formik, select } from 'formik';
import * as Yup from "yup";

function FormikExample({ stores }) {
    function validateRes(value) {
        console.log(value)
        let error
        if (value === "") {
            error = 'Restaurant is required'
        }

        return error
    }




    return (
        <>
            <Header />
            <Flex flexDir='row' width='100%'>
                <Sidebar />
                <Flex pos='sticky' width='100%' flexDir='column' justify='center' boxShadow='inner' bg='grey100' align='center'>
                    <Box rounded={'lg'} bg='white' boxShadow={'lg'} p={8}>
                        <Formik
                            initialValues={{ Store: "", Question: "" }}
                            validationSchema={Yup.object({
                                Store: Yup.string().required("Store cannot be empty"),
                                Question: Yup.string().required("Question cannot be empty"),
                            })}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2))
                                    actions.setSubmitting(false)
                                }, 1000)
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.Store && form.touched.Store}>
                                                <FormLabel>Restaurant</FormLabel>
                                                <Field as="select" name="Store">
                                                    <option value="" label="Select a store">
                                                        Select a store{" "}
                                                    </option>
                                                    {stores.map((store) => (
                                                        <option>{store.storeName}</option>
                                                    ))}
                                                </Field>

                                                <FormErrorMessage>{form.errors.Store}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    
                                    <Field name='Question' as={Input}>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.Question && form.touched.Question}>
                                                <FormLabel>Question</FormLabel>
                                                <Textarea {...field} placeholder='' />
                                                <FormErrorMessage>{form.errors.Question}</FormErrorMessage>
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
                </Flex>
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

    const stores = await prisma.Store.findMany({
        orderBy: { storeName: 'asc' },
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
    console.log(stores)
    return { props: { stores } }
}

export default FormikExample;

/*
function askQuestion() {
    return (
      <>
        <Header />
        <Flex flexDir='row' width='100%'>
          <Sidebar />
          <questionForm />
        </Flex>
      </>
    )
  }

  export default askQuestion;
*/