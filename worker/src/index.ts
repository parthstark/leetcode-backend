import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL

const redisClient = createClient({
    url: REDIS_URL
});

async function connectClient() {
    try {
        await redisClient.connect();
        console.log("connected to redis client");
    } catch (error) {
        console.error("failed to connect to redis", error);
    }
}

const main = async () => {
    await connectClient();
    while (true) {
        const response = await redisClient.brPop("problems", 0)
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log(response);
    }
}

main();