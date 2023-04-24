require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const MongoConnection = require("./mongoDB/connection");
const routes = require("./routes/index");


server.use(express.urlencoded({extended: false}));
server.use(cors({
    origin: [
        "https://my-zoo-client.onrender.com"
    ]
}));
server.use(express.json());
server.use("/", routes);



MongoConnection()

const port = process.env.PORT || 4500;

server.listen(port, () => {
    console.log(`we run on port ${port}`);
})