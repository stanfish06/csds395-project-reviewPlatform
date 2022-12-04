import prisma from '/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {

    } else if (req.method === 'POST') {
        const data = req.body
        const data_parsed = JSON.parse(data)
        const userId = data_parsed[0].userId
        var data_update = []
        for (let i = 0; i < data_parsed.length; i++) {
            if (data_parsed[i].selected) {
                data_update.push({ tagId: data_parsed[i].tagId })
            }
        }
        await prisma.User.update({
            where: {
                caseId: userId,
            },
            data: {
                tags: {
                    set: []
                },
            },
        })
        await prisma.User.update({
            where: {
                caseId: userId,
            },
            data: {
                tags: {
                    connect: data_update,
                },
            },
        })
        //const data_parsed = data.map((tag) => JSON.parse(tag))
        console.log(data_update)
        //JSON.parse(data)
        return res.status(200).json();
    }
}