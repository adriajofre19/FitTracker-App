import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    
    try {
        const { date } = req.body;

        const session = await getSession({ req });
        const user = await prisma.user.findUnique({
            where: { email: session?.user?.email ?? undefined },
        });

        const userRoutines = await prisma.userRoutine.findMany({
            where: { userId: user?.id },
            include: {
                routine: {
                    include: {
                        exercises: true,
                    },
                },
            },
        });

        console.log(userRoutines);

        // get routine thay id = userRoutine.routineId
        const routines = userRoutines.map((userRoutine) => {
            const routine = userRoutine.routine;
            return {
                id: routine.id,
                name: routine.name,
                date: userRoutine.date,
                exercises: routine.exercises,
            };
        });
        
        res.status(200).json(routines);
    } catch (error) {
        res.status(500).json(null);
    } finally {
        await prisma.$disconnect();
    }
}