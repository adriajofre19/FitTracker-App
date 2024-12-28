import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, description, exercises, email } = req.body;

    const user = await prisma.user.findUnique({
        where: { email: email },
    });


    try {

        const routine = await prisma.routine.create({
            data: {
                name,
                description,
                userId: user ? user.id : '',
                
            },
        });



        const id = routine.id;
        console.log(id);

        for (let i = 0; i < exercises.length; i++) {
            console.log(exercises[i]);
            await prisma.exercise.create({
                data: {
                    routineId: id,
                    exerciseId: exercises[i],
                },
            });
            
        }

        


        

        return res.status(200).json(routine);
    

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
}