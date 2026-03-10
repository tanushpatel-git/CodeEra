const express = require('express');
const cookieParser = require('cookie-parser');
const  app = express();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config({quiet: true});
const userRoute = require('./routes/user.routes')
const videoRoute = require('./routes/videoCalling.routes')
const chatRoute = require('./routes/chat.routes')
const sessionRoute = require('./routes/session.routes')
const codeExecuteController = require('./controllers/codeExecute.controller')


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
            description: 'API documentation for the backend',
            contact: {
                name: 'Developer'
            }
        },
        servers: [
            {
                url: 'http://localhost:8001',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// routes middleware
app.use("/user" ,userRoute)
app.use("/access", videoRoute);
app.use("/chat", chatRoute);
app.use("/session", sessionRoute);


//Post api
app.post("/run", codeExecuteController );


module.exports = app;