import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const exercises = await prisma.exercise.findMany();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercises' });
    } finally {
        await prisma.$disconnect();
    }
}
 