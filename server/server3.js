import express from 'express';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import cookieParser from 'cookie-parser'; // For parsing cookies
import authenticateToken from './middleware/authenticateToken.js';
import cors from "cors";

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
  ];



// Allow CORS from http://localhost:3210
const corsOptions = {
    origin: "http://localhost:3210",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If you need to allow cookies or other credentials
};


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

const JWT_SECRET = 'your_jwt_secret';
const REFRESH_TOKEN_SECRET = 'your_refresh_secret';
const app = express();
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing
app.use(cors(corsOptions));


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

// Login route (for issuing access and refresh tokens)
app.post('/auth', async (req, res) => {
  const { username } = req.body;
  const userId = 'someUserIdFromDatabase'; // Fetch from DB after authentication
  const user = { username, userId };

  // Issue Access Token (expires in 1 minute)
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '30s' });

  // Issue Refresh Token
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);
//   const refreshTokenExpiresIn = 7 * 24 * 60 * 60; // 7 days in seconds
  const refreshTokenExpiresIn = 90; // 7 days in seconds

  // Store Refresh Token in Redis with expiration
  await storeRefreshTokenInRedis(userId, refreshToken, refreshTokenExpiresIn);

  // Send Refresh Token as an HTTP-only, Secure cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,       // Prevent JavaScript access to the cookie
    secure: true,         // Send only over HTTPS
    sameSite: 'Strict',   // Protect against CSRF
    maxAge: refreshTokenExpiresIn * 1000, // 7 days in milliseconds
  });

  // Send access token in response
  res.json({ accessToken });
});

// Refresh Token route (to issue a new access token)
app.post('/refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Get refresh token from HTTP-only cookie
//   console.log(`Refresh token from cookie ${refreshToken}`) --> debugging
  if (!refreshToken) {
    res.clearCookie('refreshToken'); // Clear the refresh token cookie
    res.status(403).send('Logout successful');
  } else {
    try {
        // Verify Refresh Token in Redis
        const userId = await verifyRefreshTokenInRedis(refreshToken);
        if (!userId) return res.status(403).send('Invalid Refresh Token');
    
        // Verify the token itself
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) return res.status(403).send('Invalid Refresh Token');
    
          // Issue a new Access Token
          const newAccessToken = jwt.sign({ username: user.username, userId: user.userId }, JWT_SECRET, { expiresIn: '1m' });
          res.json({ accessToken: newAccessToken });
        });
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
  }
});

// Logout route (for clearing refresh tokens)
app.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Get refresh token from cookie
  if (!refreshToken) {
    res.send('Logout successful');
  } else {
    try {
        await redisClient.del(`refreshToken:${refreshToken}`);
        res.clearCookie('refreshToken'); // Clear the refresh token cookie
        res.send('Logout successful');
      } catch (err) {
        res.status(500).send('Error logging out');
      }
  }


});

app.get('/books', authenticateToken, (req, res) => {
    res.json(books);
  });

app.post('/verify-token', (req, res) => {
    const { token } = req.body;

    // Verify the token using your secret key
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ valid: false, message: 'Invalid or expired token' });
        }
        res.json({ valid: true });
    });
});

app.post('/verify-refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;  // Get the refresh token from the HTTP-only cookie
    if (!refreshToken) return res.status(401).send('No refresh token provided');

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ valid: false, message: 'Invalid or expired token' });
        res.json({ valid: true });
    });
});



// Connect to Redis and start the server
const startServer = async () => {
  await connectRedis();
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
