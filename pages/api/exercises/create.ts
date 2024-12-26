import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if(req.method === 'POST') {
    const { name, force, level, category, mechanic } = req.body;
    if (!name || !force || !level || !category || !mechanic) {
        return res.status(400).json({ error: 'Missing body parameter' });
    } 
    try {
        const exercise = await prisma.exercises.create({
            data: {
                name,
                force,
                level,
                category,
                mechanic
            }
        });
        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create exercise' });
    } finally {
        await prisma.$disconnect();

   }
   
    }
}