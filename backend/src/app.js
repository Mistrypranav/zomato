const express = require ('express');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth.route');
const foodRoutes = require('./routes/food.route');
const cors = require('cors');


const app  = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);
app.use(cookieParser());
app.use(express.json());



app.get("/", (req, res) =>{
    res.send("heelow world");
});

app.use("/api/auth", authRoute);
app.use('/api/food', foodRoutes);

module.exports = app;