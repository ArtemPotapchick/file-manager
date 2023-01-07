import * as fsPromises from 'fs/promises';
import path from "path";
import { pipeline } from "stream/promises";

const copy = async (source, dest) => {
  try {
    const readStream = (
      await fsPromises.open(path.join(source), 'r')
    ).createReadStream();
    const writeStream = (
      await fsPromises.open(path.join(dest,source), 'w')
    ).createWriteStream();
    await pipeline(readStream, writeStream);
  } catch (e) {
    console.log('Operation failed!');
  }
};
export default copy;
