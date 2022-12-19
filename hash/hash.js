import fs from "fs";
import crypto from "crypto";
import * as path from "path";

const calculateHash = async (filePath) => {
  fs.readFile(path.join(filePath), (err, fileBuffer) => {
    if (err) {
      console.log('Operation failed')
    }

    console.log(crypto.createHash('sha256').update(fileBuffer).digest('hex'));
  });
};
export default calculateHash;
