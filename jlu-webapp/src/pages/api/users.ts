import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // GET all users
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } else if (req.method === 'POST') {
        // POST a new user
        const { name, greeting } = req.body;
        const newUser = await prisma.user.create({
            data: {
                name,
                greeting,
            },
        });
        res.status(201).json(newUser);
    } else if (req.method === 'DELETE') {
        // DELETE all users
        await prisma.user.deleteMany();
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
