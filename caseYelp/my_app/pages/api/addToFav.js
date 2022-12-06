import prisma from '/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {

    } else if (req.method === 'POST') {
        const data = req.body
        const data_parsed = JSON.parse(data)
        const userId = data_parsed.userId
        const storeId = data_parsed.storeId
        const add = data_parsed.add
        console.log(userId)
        console.log(storeId)
        if (add) {
            await prisma.User.update({
                where: {
                    caseId: userId,
                },
                data: {
                    favStore: {
                        connect: {
                            storeId: storeId
                        },
                    },
                },
            })
        }
        else {
            await prisma.User.update({
                where: {
                    caseId: userId,
                },
                data: {
                    favStore: {
                        disconnect: {
                            storeId: storeId
                        },
                    },
                },
            })
        }
        return res.status(200).json();
    }
}