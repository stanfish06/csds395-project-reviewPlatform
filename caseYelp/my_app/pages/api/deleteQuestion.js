import prisma from '/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log('no')
    } else if (req.method === 'POST') {
        console.log('posting')
        const data = req.body
        const { questionId } = JSON.parse(data)
        console.log(questionId)

        await prisma.Question.delete({
            where: {
                questionId: Number(questionId)
            },
        })
        return res.status(200).json();
    }
}