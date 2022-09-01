const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe =  require("stripe")('sk_test_51LdCUeKTfsZOaFc9XQ0UyOiRc35ZMndkDgl3zMGkn7g2x8788CNn4zmbsXXzuoBNBvwQwLHIWRLHn0M2yFfKAuhm00kZMF6oKY')


//API

//APP config
const app = express();

//Middlewares
app.use(cors({origin:true}));
app.use(express.json())
//API routes
app.get('/',(request,response)=>response.status(200).send('Hello world'))

//Listen command
exports.api = functions.https.onRequest(app)