import prisma from '/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log('no')
    } else if (req.method === 'POST') {
        const data = req.body

        const { userId, score, review, storeId, userName } = JSON.parse(data)
        
        await prisma.Review.create({
            data: {
                review: review,
                userId: userId,
                score: Number(score),
                storeId: storeId,
                authorName: userName
            }
        })
        await prisma.Store.update({
            where: {
                storeId: storeId,
            },
            data: {
                totalScore: {
                    increment: Number(score),
                },
            },
        })
        return res.status(200).json();
    }
}