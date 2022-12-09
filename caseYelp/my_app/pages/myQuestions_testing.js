import React, { useState } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import prisma from "/lib/prisma";
import { Flex } from "@chakra-ui/react";
import QuestionCardPage from "../component/QuestionCardPage";
import { getSession } from "next-auth/react";

function MyQuestions({ questions, _alltags, userInf }) {
  const [allQuestions, setAllQuestions] = useState(questions);
  const [alltags, setAlltags] = useState(_alltags);

  return (
    <>
      <Header tagContent={alltags} _userInf={userInf} />
      <Flex flexDir="row" width="100%">
        <Sidebar />
        <QuestionCardPage _allQuestions={allQuestions} />
      </Flex>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  const case_email = 'zxy441@case.edu'
  const user_image = ''
  const user_name = 'Zhiyuan Yu'
  const case_id = case_email.substr(0, case_email.indexOf('@'));
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

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
      _alltags,
      userInf,
    },
  };
};

export default MyQuestions;
