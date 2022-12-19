import * as path from 'path';
import * as fsPromises from 'fs/promises';

const rename = async (filePath,newFileName) => {
  try {
    await fsPromises.rename(path.join(filePath), path.join(newFileName));
  } catch (e) {
    console.log('Operation Failed!');
  }
};

export default rename;
