import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = express.Router();
const refreshTokenRouter = express.Router();
const loginRouter = express.Router();
const logoutRouter = express.Router();

router.get('/', (req, res) => {
    res.send('ROUTE SUCCESS');
});

let refreshTokens = [];


refreshTokenRouter.post('/refreshToken', (req, res) => {
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


loginRouter.post('/', (req, res) => {
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


logoutRouter.post('/logout', (req, res) => {
	const refreshToken = req.body.token;
	refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
	res.sendStatus(200);
});

export { router, refreshTokenRouter, loginRouter, logoutRouter };


// export default router;

// module.exports = {
//     router,
//     refreshTokenRouter,
//     loginRouter,
//     logoutRouter
// }

