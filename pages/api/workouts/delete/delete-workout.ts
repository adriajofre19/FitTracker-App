import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.body;
    console.log(id);

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {

        const userroutine = await prisma.userRoutine.findMany({
            where: { routineId: id },
        });

        await prisma.exercise.deleteMany({
            where: { routineId: id },
        });

        // delete all userRoutine entries
        for (let i = 0; i < userroutine.length; i++) {
            await prisma.userRoutine.delete({
                where: { id: userroutine[i].id },
            });
        }



        const routine = await prisma.routine.delete({
            where: { id: id },
        });

        return res.status(200).json({ message: 'Routine deleted', routine });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}