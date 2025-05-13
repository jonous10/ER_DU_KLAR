import { NextFunction, Request, Response, Router } from 'express';
import { redisClient } from '../redis-source';

const router = Router();

router.get('/get_language', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { seg, lan } = req.query;

        if (!seg || !lan) {
            return res.status(400).json({ error: 'Segment (seg) and language (lan) are required.' });
        }

        // Fetch the data from the "languages" hash in Redis
        const languageData = await redisClient.hGet('languages', seg as string);

        if (!languageData) {
            return res.status(404).json({ error: `Segment '${seg}' not found.` });
        }

        const parsedData = JSON.parse(languageData);

        if (!parsedData[lan as string]) {
            return res.status(404).json({ error: `Language '${lan}' not found under segment '${seg}'.` });
        }

        return res.status(200).json({ data: parsedData[lan as string] });
    } catch (err) {
        next(err);
    }
});

export default router;
