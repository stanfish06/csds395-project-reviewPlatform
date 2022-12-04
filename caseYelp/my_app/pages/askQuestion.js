import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { getSession } from "next-auth/react";
import { Field, Form, Formik, select } from "formik";
import * as Yup from "yup";

function FormikExample({ stores, _alltags, userInf }) {
  const [alltags, setAlltags] = useState(_alltags);
  function validateRes(value) {
    console.log(value);
    let error;
    if (value === "") {
      error = "Restaurant is required";
    }

    return error;
  }

  const submitQuestion = async (questionContent, userId, storeId, userName) => {
    const response = await fetch('/api/question', {
        method: 'POST',
        body: JSON.stringify({
            questionContent: questionContent,
            storeId: storeId,
            userId: userId,
            publisherName: userName,
        }),
    })
}

  return (
    <>
      <Header tagContent={alltags} _userInf={userInf} />
      <Flex flexDir="row" width="100%">
        <Sidebar />
        <Flex
          pos="sticky"
          width="100%"
          flexDir="column"
          justify="center"
          boxShadow="inner"
          bg="grey100"
          align="center"
        >
          <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
            <Formik
              initialValues={{ Store: "", Question: "" }}
              validationSchema={Yup.object({
                Store: Yup.string().required("Store cannot be empty"),
                Question: Yup.string().required("Question cannot be empty"),
              })}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  submitQuestion(values.Question, userInf.UserId, values.Store, userInf.Name)
                //  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Field>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.Store && form.touched.Store}
                      >
                        <FormLabel>Restaurant</FormLabel>
                        <Field as="select" name="Store">
                          <option value="" label="Select a store">
                            Select a store{" "}
                          </option>
                          {stores.map((store) => (
                            <option value={store.storeId}>{store.storeName}</option>
                          ))}
                        </Field>

                        <FormErrorMessage>{form.errors.Store}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="Question" as={Input}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.Question && form.touched.Question
                        }
                      >
                        <FormLabel>Question</FormLabel>
                        <Textarea {...field} placeholder="" />
                        <FormErrorMessage>
                          {form.errors.Question}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
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
  );
}

export const getServerSideProps = async ({ req, res }) => {
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

  const stores = await prisma.Store.findMany({
    orderBy: { storeName: "asc" },
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
  return { props: { stores, _alltags, userInf } };
};

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
