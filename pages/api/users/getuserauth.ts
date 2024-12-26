import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req });
        const user = await prisma.user.findUnique({
            where: { email: session?.user?.email ?? undefined },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        await prisma.$disconnect();
    }
}