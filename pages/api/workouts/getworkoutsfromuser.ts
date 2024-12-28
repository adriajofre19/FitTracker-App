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

        const routines = await prisma.routine.findMany({
            where: { userId: user?.id },
            include: {
                exercises: true,
            },
        });

        res.status(200).json(routines);
    } catch (error) {
        res.status(500).json(null);
    } finally {
        await prisma.$disconnect();
    }
}