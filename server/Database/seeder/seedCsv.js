import fs from "fs";
import path from "path";
import neatCsv from "neat-csv";
import mongoose from "mongoose";
import BuyRequest from "../models/BuyRequest";
import SellRequest from "../models/SellRequest";
import "dotenv/config";
import connectDatabase from "../index";

connectDatabase();

const fileArray = ["SellRequest.csv"];


const insertFile = (fileName) => {
  const filePath = path.resolve(__dirname, fileName);
  const file = fileName.split('.')[0]
  fs.readFile(filePath, async (error, data) => {
    if (error) return console.log("error reading file", error);
    const parsedData = await neatCsv(data);
    // const getPhoneModel = {
    //   BuyRequest: await BuyRequest.insertMany(parsedData),
    //   SellRequest: await SellRequest.insertMany(parsedData),
    // };
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

fileArray.forEach(async (fileArray) => await insertFile(fileArray));
