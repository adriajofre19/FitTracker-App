import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email,name, age, weight, height } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { name, age, weight, height },
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
}