const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoURL  = "mongodb://127.0.0.1:27017/wanderlust";
mongoose.connect(mongoURL)
    .then(() => console.log("Connected!"));

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: "67409eb7942390e94e1e56ed"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();

