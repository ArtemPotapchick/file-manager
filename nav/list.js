import { readdir } from 'fs/promises';
import * as path from "path";


const listFiles = async (currentDirectory) => {
  try{
  const list = (await readdir(path.join(currentDirectory), { withFileTypes: true })).reduce((acc,curr)=>{
    return [...acc,{Name:curr.name,Type:curr.isFile()? 'File': 'Directory'}]
  },[])
    console.table(list);
  }catch (e){
    console.log('Operation failed!');
  }
};
export default listFiles;
