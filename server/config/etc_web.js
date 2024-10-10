import YAML from "yaml";
import fs from 'fs';
// editable text configurations for web server

// Allow CORS from http://localhost:3210
const corsOptions = {
    origin: "http://localhost:3210",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies and other credentials
};


// API Documentation
const apiDocFile = fs.readFileSync('./docs/api_docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(apiDocFile)
const swaggerOptions = {
  // customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "VGU SLS API Documentation",
  // customfavIcon: "/assets/favicon.ico"
};


export default { corsOptions, swaggerDocument, swaggerOptions };