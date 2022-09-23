import prisma from '../lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'Get') {
      return res.status(404).json({ error: "Method not allowed" });
    }

    const allStores = await prisma.Store.findMany({
      orderBy: {
        storeName: "asc",
      },
      include: {
        num_views : {
          select: {
            history: true
          }
        }
      },

    });

    return res.json({ allStores });
  }