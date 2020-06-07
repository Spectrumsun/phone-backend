import fs from "fs";
import path from "path";
import neatCsv from "neat-csv";
import mongoose from "mongoose";
import BuyRequest from "../models/BuyRequest";
import SellRequest from "../models/SellRequest";
import "dotenv/config";
import connectDatabase from "../index";

connectDatabase();

const fileArray = "SellRequest.csv";


const insertFile = (fileName) => {
  const filePath = path.resolve(__dirname, fileName);
  fs.readFile(filePath, async (error, data) => {
    if (error) return console.log("error reading file", error);
    const parsedData = await neatCsv(data);
    try {
      const insertData = await SellRequest.insertMany(parsedData)
      console.log(insertData)
      mongoose.disconnect();
    } catch (error) {
      console.log(`${error} An error ocurred`);
      mongoose.disconnect();
    }
  });
};



insertFile(fileArray)