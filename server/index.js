const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).send('hello from server');
});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);


// Define rate limiting rule: 5 requests per minute per IP
const rateLimiterMiddleware = rateLimit({
  windowMs: 2 * 1000, // 1 minute
  max: 1, // Limit each IP to 5 requests per `window` (1 minute)
  message: '<h1>Too many login attempts. Please try later. 🫸</h1>',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


app.get('/ddosTest', rateLimiterMiddleware, (req, res) => {
    res.status(200).send('<h1>⚜️ Request granted. ⚜️ 🎉</h1>');
})

app.listen(port, () => {
    console.log('server is running on localhost at port 5000');
})