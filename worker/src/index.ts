import { createClient } from "redis";
const redisClient = createClient();

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