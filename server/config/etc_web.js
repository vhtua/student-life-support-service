// editable text configurations for web server

// Allow CORS from http://localhost:3210
const corsOptions = {
    origin: "http://localhost:3210",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies and other credentials
};


export default { corsOptions };