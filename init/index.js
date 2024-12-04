const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoURL  = "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(mongoURL)
    .then(() => console.log("Connected!"));

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: "674ce10165f1282aa2e14dd5"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();

