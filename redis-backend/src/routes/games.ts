import { NextFunction, Request, Response, Router } from 'express';
import { redisClient } from '../redis-source';

const router = Router();

router.get('/search_steam/:search', async (req: Request, res: Response, next: NextFunction) => {
    const {search} = req.params;

    try {
        const allGames = await redisClient.hGetAll('games');
        
        const gameNames = Object.keys(allGames).map(key => {return {appid: key, name: allGames[key]}});

        let searchedGames = []

        gameNames.map((game) => {
            if (game.name.toLowerCase().includes(search.toLowerCase())){
                searchedGames.push(game)
            }
        })

        if (searchedGames.length < 1) {
            res.status(404).json({ message: "game does not exist"})
            return
        }
        res.status(200).json(searchedGames)
    } catch (error) {
        next(error);
    }
})

router.get('/get_player_count/:appid', async (req: Request, res: Response, next: NextFunction) => {
    const {appid} = req.params;
    
    
    try {

        const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`;
        const options = { method: 'GET' };

        const response = await fetch(url, options)

        const data = await response.json();

        const playerCount = data.response.player_count || 0

        res.status(200).json(playerCount)
    }
    catch (error) {
        next(error)
    }
})

router.post('/fill_game_data', async (req: Request, res: Response, next: NextFunction) => {
    const url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    const options = { method: 'GET' };

    try {
        const reponse = await fetch(url, options);

        const data = await reponse.json();


        data.applist.apps.map((app: { name: string; appid: number }) => {
            redisClient.hSet('games', app.appid, app.name)
        });
        res.status(201).json({ message: "Success"})
    }
    catch (error) {
        next(error);
    }
    
})


router.get('/search_game/:appid', async (req: Request, res: Response, next: NextFunction) => {
    const {appid} = req.params;
    const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`;
        const options = {
            method: 'GET'
        };

    try {
        const response = await fetch(url, options);

        const data = await response.json();

        const playerCount = data.response.player_count

        if (playerCount === undefined) {
            res.status(404).json({ message: "404 not found"})
            return
        }

        res.status(200).json({player_count: playerCount})
    } catch (error) {
        next(error);
    }
});

router.get('/get_all_games', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allGames = await redisClient.hGetAll('games');

        if (allGames === undefined) {
            res.status(404).json({ message: "404 not found"})
            return
        }
        
        res.status(200).json({allGames})
    }
    catch (error) {
        next(error)
    }
})

router.get('/get_game_details/:appid', async (req: Request, res: Response, next: NextFunction) => {
    const {appid} = req.params;
    try {
        const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
        

        const response = await fetch(url);
        const data = await response.json();

        if (data[appid] && data[appid].success) {
            res.status(200).json({
                name: data[appid].data.name,
                original_price: data[appid].data.price_overview.initial_formatted,
                discount: data[appid].data.price_overview.discount_percent,
                price: data[appid].data.price_overview.final_formatted || "Free",
                required_age: data[appid].data.required_age,
                categories: data[appid].data.categories
            });
        } else {
            res.status(404).json({ message: "Game details not found" });
        }
    } catch (error) {
        next(error);
    }
});

export default router;