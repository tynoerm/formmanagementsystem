import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from "cors";

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Optional: if you're sending cookies/auth headers
};

app.use(cors(corsOptions));
app.use(express.json()); 


import { ivendRoutes } from './routes/userforms/ivendRoutes.js'
import { domainRoutes } from './routes/userforms/domainRoutes.js';
import { meatmatrixRoutes } from './routes/userforms/meatmatrixRoutes.js';
import { internetaccessRoutes } from './routes/userforms/internetaccessRoutes.js';
import { vpnRoutes } from './routes/userforms/vpnRoutes.js';
import { changeofcontrolRoutes } from './routes/userforms/changeofcontrolRoutes.js';
import { usersRoutes } from './routes/usermanagementRoutes.js';
import { formselectionRoutes } from './routes/formselectionRoutes.js';


app.use("/ivendusers" , ivendRoutes)
app.use("/domainaccess", domainRoutes)
app.use("/meatmatrix", meatmatrixRoutes)
app.use("/internetaccess", internetaccessRoutes)
app.use("/vpn", vpnRoutes)
app.use("/changeofcontrol", changeofcontrolRoutes)
app.use("/users", usersRoutes)
app.use('/api/forms', formselectionRoutes);


app.use(express.urlencoded({ extended: true })); 
app.use(cors(corsOptions));

// Connecting to MongoDB Database with options
mongoose.connect("mongodb://localhost:27017/ampformsystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 40000,  // 30 seconds for connection timeout
  socketTimeoutMS: 40000,   // 30 seconds for socket timeout
})
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });




// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Connection Established Successfully on " + port);
});