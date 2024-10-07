import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
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


// Function to store newly reset password of a token in Redis
const storeResetPasswordInRedis = async (password, token, expiresIn) => {
  await redisClient.set(token, password, {
    EX: expiresIn,
  });
};


const getResetPasswordFromRedis = async (token) => {
  const password = await redisClient.get(token);
  return password;
};


// Function to verify refresh token in Redis
const verifyRefreshTokenInRedis = async (refreshToken) => {
    const userId = await redisClient.get(`refreshToken:${refreshToken}`);
    return userId;
};

export default { redisClient, connectRedis, storeRefreshTokenInRedis, verifyRefreshTokenInRedis, storeResetPasswordInRedis, getResetPasswordFromRedis }