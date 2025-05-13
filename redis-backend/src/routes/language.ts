import { NextFunction, Request, Response, Router } from 'express';
import { redisClient } from '../redis-source';

const router = Router();

// ----------- GET /get_language -----------
interface LanguageQuery {
  seg: string;
  lan: string;
}

router.get(
  '/get_language',
  async (req: Request<{}, {}, {}, LanguageQuery>, res: Response, next: NextFunction) => {
    try {
      const { seg, lan } = req.query;

      if (!seg || !lan) {
        return res.status(400).json({ error: 'Segment (seg) and language (lan) are required.' });
      }

      const languageData = await redisClient.hGet('languages', seg);
      if (!languageData) {
        return res.status(404).json({ error: `Segment '${seg}' not found.` });
      }

      const parsedData = JSON.parse(languageData);
      if (!parsedData[lan]) {
        return res.status(404).json({ error: `Language '${lan}' not found under segment '${seg}'.` });
      }

      return res.status(200).json({ data: parsedData[lan] });
    } catch (err) {
      next(err);
    }
  }
);

// ----------- POST /save-to-redis -----------
router.post('/save-to-redis', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Missing "data" in request body.' });
    }

    await redisClient.set('myDataKey', data);
    return res.status(200).json({ message: 'Data saved to Redis.' });
  } catch (err) {
    next(err);
  }
});

// ----------- GET /get-from-redis -----------
router.get('/get-from-redis', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await redisClient.get('myDataKey');
    if (!data) {
      return res.status(404).json({ error: 'No data found in Redis.' });
    }

    return res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});

export default router;
