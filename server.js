const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const ejs = require("ejs");
const customercontroller=require("./routes/customer")
const inventorycontroller=require("./routes/inventory")
const ordercontroller=require("./routes/order")
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())


app.listen(3001, (err)=> {
    if(!err) {
        console.log("Server is running");
    } else {
        console.log(err);
    }
});

mongoose.connect("mongodb+srv://aayuag:Qy799008kwwvU3uI@cluster0.du8bwxg.mongodb.net/?retryWrites=true&w=majority",()=> {
    console.log("Connected to db")
}, (err)=> {
    console.log(err);
});

app.use("/inventory",inventorycontroller)

app.use('/order', ordercontroller)

app.use("/customer",customercontroller)