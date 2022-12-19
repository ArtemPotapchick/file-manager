import * as path from 'path';
import * as fs from 'fs';

const read = async (filePath) => {
  try {
    const rs = fs.createReadStream(path.join(filePath), { encoding: 'utf8' });
    rs.on('data', (dataChunk) => {
      console.log(dataChunk);
    });
  } catch (e) {
    console.log('Operation Failed!');
  }

};
export default read;
