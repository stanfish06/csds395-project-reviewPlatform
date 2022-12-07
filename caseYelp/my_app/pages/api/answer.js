import prisma from '/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log('no')
    } else if (req.method === 'POST') {
        const data = req.body

        const { answer, answeredAt, userId, publisherName, questionId } = JSON.parse(data)
        
        await prisma.Answer.create({
            data: {
                answer: answer,
                answeredAt: answeredAt,
                userId: userId,
                publisherName: publisherName,
                questionId: questionId
            }
        })
        
        return res.status(200).json();
    }
}