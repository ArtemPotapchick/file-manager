import * as path from 'path';
import * as fsPromises from 'fs/promises';

const create = async (filePath) => {
  try {
      await fsPromises.appendFile(path.join(filePath), '');
  } catch (e) {
    console.log('Operation Failed!');
  }
};
export default create;
