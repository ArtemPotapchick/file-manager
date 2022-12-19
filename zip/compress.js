import zlib from 'zlib'
import fsPromises from "fs/promises";
import { pipeline } from "stream/promises";
import path from "path";

const compress = async (source,dest) => {
    const brotli = zlib.createBrotliCompress()
    try {
      const readStream = (
        await fsPromises.open(path.join(source), 'r')
      ).createReadStream();
      const writeStream = (
        await fsPromises.open(path.join(dest||process.cwd(),source), 'w')
      ).createWriteStream();
      await pipeline(readStream,brotli, writeStream);
    } catch (e) {
      console.log(e);
      console.log('Operation failed!');
    }
};

export default compress;
