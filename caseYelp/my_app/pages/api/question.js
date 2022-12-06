import prisma from '/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log('no')
    } else if (req.method === 'POST') {
        console.log('posting')
        const data = req.body
        const { questionContent, userId, publisherName, storeId } = JSON.parse(data)

        const storeName = await prisma.Store.findUnique({
            where: {
                storeId: Number(storeId)
            },
            select: {
                storeName: true
            }
        })  

        await prisma.Question.create({
            data: {
                question: questionContent,
                storeId: Number(storeId),
                userId: userId,
                storeName: storeName.storeName,
                publisherName: publisherName,
            }
        })
        return res.status(200).json();
    }
}