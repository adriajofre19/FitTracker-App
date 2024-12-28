import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    console.log(req.body);

    const { routineId, userId, date } = req.body;

    try {

        const scheduledRoutine = await prisma.userRoutine.create({
            data: {
                routineId,
                userId,
                date,
            },
        });

    
        return res.status(200).json(scheduledRoutine);
    

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
}