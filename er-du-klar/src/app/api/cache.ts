import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await redis.set('my-key', 'Hello from Redis!');
  const value = await redis.get('my-key');

  res.status(200).json({ value });
}