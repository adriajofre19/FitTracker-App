import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, name } = req.body;

    if (!email || !name ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { name },
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
}