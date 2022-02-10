const express = require("express");
const mongoose = require('mongoose');
const session = require("express-session");
const redis = require("redis");

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT,  REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");


let redisStore = require("connect-redis")(session);

 
let redisClient = redis.createClient({
    host: REDIS_URL, 
    port : REDIS_PORT 
});

const app = express();

const postRouter = require("./routes/postRoutes");

const usrRouter = require("./routes/userRoutes");

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;


const connectWithRetry = () => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then( () => console.log("Successfully connected to DB"))
    .catch( 
        (e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000);
        } 
    )
};

connectWithRetry();

 
//Not working , cant create client, check full documentation for redis
/*app.use(session({
    store : new redisStore({ client: redisClient}),
    secret : SESSION_SECRET,
    cookie : {
         secure: false,
         resave: false,
         saveUninitialized : false,
         httpOnly : true,
         maxAge : 30000

    }
}));*/
 

app.use(express.json());

app.get("/api/", (req,res) => {
    // res.send("**<h2>Hi there - version 1 - 1 ****</h2>");
    res.send("<h2>Hello world * * * * ||| ***</h2>");
    console.log("Yeah it ran !!");
});

// www.site.com -> www.site2.com
// express cors. 


// localhost:3000/posts/api/v1/
app.use("/api/v1/posts", postRouter);

// loclhost:
app.use("/api/v1/users", usrRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`lisening on the port ${port}`);
})