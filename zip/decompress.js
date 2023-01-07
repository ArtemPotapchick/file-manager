import path from "path";
import zlib from "zlib";
import fsPromises from "fs/promises";
import { pipeline } from "stream/promises";

const decompress = async (source,dest) => {
  const brotli = zlib.createBrotliDecompress()
  try {
    const readStream = (
      await fsPromises.open(path.join(source), 'r')
    ).createReadStream();
    const writeStream = (
      await fsPromises.open(path.join(dest||process.cwd(),source), 'w')
    ).createWriteStream();
    await pipeline(readStream,brotli, writeStream);
  } catch (e) {
    console.log('Operation failed!');
  }
};

export default decompress;
