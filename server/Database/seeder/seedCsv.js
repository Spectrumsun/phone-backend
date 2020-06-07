import fs from "fs";
import path from "path";
import neatCsv from "neat-csv";
import mongoose from "mongoose";
import BuyRequest from "../models/BuyRequest";
import SellRequest from "../models/SellRequest";
import "dotenv/config";

const insertFile = async () => {
  const filesName = ["SellRequest.csv", "BuyRequest.csv"].map(async (file) => {
    const splitFileName = file.split(".")[0];
    console.log(`Ruuning seed.... for ${splitFileName}`);
    const getModal = {
      BuyRequest: BuyRequest,
      SellRequest: SellRequest,
    };
    try {
      const filePath = path.resolve(__dirname, file);
      const readFile = fs.readFileSync(filePath, "utf8");
      const parsedData = await neatCsv(readFile);
      const inserFiles = await getModal[splitFileName].insertMany(parsedData);
      console.log(inserFiles)
      return inserFiles;
    } catch (error) {
      return error;
    }
  });
  return filesName;
};

export default insertFile;
