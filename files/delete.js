import * as fsPromises from 'fs/promises';
import * as path from "path";

const remove = async (filePath) => {
  try {
    await fsPromises.unlink(path.join(filePath));
  } catch (e) {
    console.log('Operation Failed!');
  }


};
export default remove;
