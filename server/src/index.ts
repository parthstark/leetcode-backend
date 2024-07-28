import express from 'express'
import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL

const redisClient = createClient({
    url: REDIS_URL
});

const app = express();
app.use(express.json());

async function startServer() {
    try {
        await redisClient.connect();
        console.log("connected to redis client");
        app.listen(3000, () => console.log("server running on port 3000"));
    } catch (error) {
        console.error("failed to connect to redis", error);
    }
}

startServer();

app.post("/submit", async (req, res) => {
    const { userId, problemId, problemCode, language, timestamp } = req.body;
    if (!userId || !problemId || !problemCode || !language || !timestamp) {
        res.status(400).send("bad request");
        return
    }

    console.log("request at ", timestamp);

    try {
        await redisClient.lPush("problems", JSON.stringify({ userId, problemId, problemCode, language }));
        res.status(200).send("submission received");
    } catch (error) {
        console.error("redis error:", error);
        res.status(500).send("internal server error");
    }
})