import { executeSql } from "../utils/executeSql";
import fastcsv from "fast-csv";
import faker from "faker";
import fs from "fs";
import parseArgs from "minimist";
import contains from "validator/lib/contains";

const args = parseArgs(process.argv.slice(2));

const output = "./../assets/output.csv";

const stream = fs.createWriteStream(output);

const categoryTranslation = () => {
  const categoryName = faker.music.genre();
  const createdOn = faker.date.recent();
  return `${categoryName},${createdOn}\n`;
};

const writeToCsvFile = async () => {
  let rows = args["rows"] || 10;
  for (let index = 0; index < rows; index++) {
    stream.write(categoryTranslation(), "utf-8");
  }
  stream.end();
};

const insertFromCsv = async () => {
  let csvData: any[] = [];
  return fastcsv
    .parse()
    .validate((data: any) => !contains(data[0], ","))
    .on("data", (data) => {
      csvData.push(data);
    })
    .on("data-invalid", (row, rowNumber) => {
      console.log(
        `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`
      );
    })
    .on("end", () => {
      const query =
        "INSERT INTO BAZAAR_CATEGORIES (CATEGORY_NAME,CREATED_ON) VALUES ($1,$2)";
      Promise.all([
        csvData.forEach(async (row) => {
          return await executeSql(query, row);
        }),
      ]);
    });
};

export const seed = async () => {
  await writeToCsvFile();
  let stream = fs.createReadStream(output);
  stream.pipe(await insertFromCsv());
};
