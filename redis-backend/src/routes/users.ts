import { NextFunction, Request, Response, Router } from 'express';
import { redisClient } from '../redis-source';
import { generate_jwt, } from '../utils/user';
import { serialize } from 'cookie';

const router = Router();

//import bcrypt from 'bcrypt';

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        const userExists = await redisClient.hGet('users', username);
        if (!userExists) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        //const isPasswordValid = await bcrypt.compare(password, userExists); //not using bcrypt yet
        const isPasswordValid = userExists === password;
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = await generate_jwt(username);

        const cookie = serialize('auth_token', token, {
            httpOnly: process.env.PRODUCTION == "true", // Cookie is only accessible on the server
            secure: true, // Set to true if served over HTTPS
            maxAge: 60 * 60 * 24 * 31, // 1 month expiration
            sameSite: process.env.PRODUCTION === "true" ? 'none' : 'lax',
            domain: process.env.PRODUCTION === "true" ? '.vest.li' : 'localhost',
            path: '/', // Cookie is accessible on all routes
        });

        res.setHeader('Set-Cookie', cookie);

        res.status(200).json({ message: 'Logged in' });
    } catch (err) {
        next(err);
    }
});

router.post('/logout', async (req: Request, res: Response) => {
    try {
        const cookie = serialize('auth_token', '', {
            httpOnly: process.env.PRODUCTION == "true", // Cookie is only accessible on the server
            secure: true, // Set to true if served over HTTPS
            maxAge: 60 * 60 * 24 * 31, // 1 month expiration
            sameSite: process.env.PRODUCTION === "true" ? 'none' : 'lax',
            domain: process.env.PRODUCTION === "true" ? '.vest.li' : 'localhost',
            path: '/', // Cookie is accessible on all routes
        });


        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ message: 'Logged out' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.post('/create_user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        const userExists = await redisClient.hGet('users', username);
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        await redisClient.hSet('users', username, password);

        res.status(201).json({ message: 'User created' });
    } catch(err) {
        next(err);
    }
});

router.get('/search_reg/:kjennemerke', async (req: Request, res: Response, next: NextFunction) => {
    const {kjennemerke} = req.params;
    const url = `https://akfell-datautlevering.atlas.vegvesen.no/enkeltoppslag/kjoretoydata?kjennemerke=${kjennemerke}`;
        const options = {
            method: 'GET',
            headers: {
                'SVV-Authorization': `Apikey ${process.env.SVV_API_KEY}`,
            },
        };

    try {
        const response = await fetch(url, options);

        let dataCar = {
            make: undefined as string | undefined,
            model: undefined as string | undefined,
            error: undefined as string | undefined,
        };

        if (response.status === 401) {
            dataCar.error = 'Unauthorized: Invalid API key or missing authorization.';
        } else if (response.status === 403) {
            dataCar.error = 'Forbidden: API key not valid or user is blocked.';
        } else if (response.status === 429) {
            dataCar.error = 'Quota exceeded: Too many requests.';
        } else if (response.status === 200) {
            const data = await response.json();

            dataCar.make = data.kjoretoydataListe[0].godkjenning.tekniskGodkjenning.tekniskeData.generelt.merke[0].merke;
            dataCar.model = data.kjoretoydataListe[0].godkjenning.tekniskGodkjenning.tekniskeData.generelt.handelsbetegnelse[0];
        }

        res.status(200).json({dataCar})
    } catch (error) {
        next(error);
    }
});


export default router;
