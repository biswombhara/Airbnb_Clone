if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/list.js");
const mongoAtlas = process.env.MONGO_ATLAS;

main().then(()=>{console.log("connenected to mongodb Atlas...")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoAtlas);  
}

let initDB = async ()=>{
    await Listing.deleteMany({});
    initdata.data =initdata.data.map((obj) =>({...obj,owner:'66c228acb98da596c5a44e76'}))
    await Listing.insertMany(initdata.data);
    console.log("data  has initialised....");
}
initDB();