import redis from 'redis';

const redisClient = redis.createClient({
    socket: {
      host: "127.0.0.1",
      port: "6379",
    },
  });


const connectRedis = async () => {
    await redisClient.connect();
    redisClient.on('error', (err) => {
        console.error('Redis error:', err);
    });
    console.log('Redis connected successfully');
};

// Function to store refresh token in Redis
const storeRefreshTokenInRedis = async (userId, refreshToken, expiresIn) => {
    await redisClient.set(`refreshToken:${refreshToken}`, userId, {
      EX: expiresIn,
    });
  };


// Function to verify refresh token in Redis
const verifyRefreshTokenInRedis = async (refreshToken) => {
    const userId = await redisClient.get(`refreshToken:${refreshToken}`);
    return userId;
};

export default { redisClient, connectRedis, storeRefreshTokenInRedis, verifyRefreshTokenInRedis }