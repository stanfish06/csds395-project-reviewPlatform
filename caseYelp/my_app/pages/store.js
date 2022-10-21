import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import prisma from '/lib/prisma';


const storeDetail = (store) => {
    console.log(store)
    const storeInf = store.store
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
        questions,
        reviews
    } = storeInf


    return (
        <>
            <Header />
            <Flex flexDir='row' width='100%'>
                <Sidebar />
                {storeName}
            </Flex>
        </>
    )
}

export async function getServerSideProps({ req, res, query }) {
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
            questions: true,
        },
    })
    return { props: { store } }
}

export default storeDetail;