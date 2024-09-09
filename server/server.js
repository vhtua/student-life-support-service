import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import {authenticateToken} from './utils/authorization.js';

import {loginRouter, router} from './router/auth.js'


// ==============================|| Read config, init app ||============================== //
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/auth', router);
app.use('/login', loginRouter);

// ==============================|| Authentication ||============================== //
let refreshTokens = [];

app.post('/refreshToken', (req, res) => {
	const refreshToken = req.body.token;
	if (!refreshToken) res.sendStatus(401);
	if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

  	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
		console.log(err, data);
		if (err) res.sendStatus(403);
		const accessToken = jwt.sign( { username: data.username }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1000s',});
		res.json({ accessToken });
  	});
});


app.post('/login', (req, res) => {
	// Authentication
	// Authorization
	// { username: 'Test' }
  	const data = req.body;
  	console.log({ data });
  	const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1000s',});
  	const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  	refreshTokens.push(refreshToken);
  	res.json({ accessToken, refreshToken });
	// console.log(process.env.ACCESS_TOKEN_SECRET)
});


app.post('/logout', (req, res) => {
	const refreshToken = req.body.token;
	refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
	res.sendStatus(200);
});









const books = [
  {
    id: 1,
    name: 'Chi Pheo',
    author: 'ABC',
  },
  {
    id: 2,
    name: 'Chien tranh va Hoa Binh',
    author: 'DEF',
  },
];

app.get('/books', authenticateToken, (req, res) => {
    res.json({ status: 'Success', data: books });
});



app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});