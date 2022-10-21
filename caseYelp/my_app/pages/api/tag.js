import prisma from '/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const tags = await prisma.User.findMany({
            where : {
                caseId: 'zxy441',
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
        const _alltags = await prisma.Tag.findMany({
            distinct: ['tagId'],
            select: {
                tagId: true,
                tagName: true,
            },
        })
        res.status(200).json([tags, _alltags])
    } else if (req.method === 'POST') {

    }
}