import * as os from 'os';
import {cpus} from 'os';
import * as readline from "readline";
import listFiles from "./nav/list.js";
import navigateTo from "./nav/navigation.js";
import commands from "./utils/commands.js";
import calculateHash from "./hash/hash.js";
import read from "./files/read.js";
import create from "./files/create.js";
import rename from "./files/rename.js";
import remove from "./files/delete.js";
import copy from "./files/copy.js";
import compress from "./zip/compress.js";
import decompress from "./zip/decompress.js";

let userName = '';
const welcomePhrase = process.argv.map((item) => {
  if (item.startsWith('--username=')) {
    userName = item.split('=')[1];
    return `Welcome to the File Manager, ${userName||'Anonymous'}!`;
  }
}).join('');

process.stdin.setEncoding('utf-8');
process.chdir(os.homedir());
process.stdout.write(welcomePhrase + '\n');
process.stdout.write(`You are currently in ${process.cwd()}\n`);
process.on('exit', () => {
  process.stdout.write(`Thank you for using File Manager, ${userName||'Anonymous'}, goodbye!\n`);
});
process.on('SIGINT', function () {
  process.exit(0);
});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
rl.on('line', async (line) => {
  let str = line.trim();
  switch (true) {
    case /.exit/.test(str): {
      process.exit(0);
      break;
    }
    case commands.ls.test(str): {
      await listFiles(process.cwd());
      break;
    }
    case commands.up.test(str): {
        navigateTo('..');
      break;
    }

    case commands.cat.test(str): {
      await read(str.replace("cat ", ""));
      break;
    }
    case commands.remove.test(str): {
      await remove(str.replace("rm ", ""));
      break;
    }
    case commands.rename.test(str): {
      let filePath = str.replace("rn ", "").split(' ')[0];
      let newFileName = str.replace("rn ", "").split(' ')[1];
      await rename(filePath, newFileName);
      break;
    }
    case commands.copy.test(str): {
      let filePath = str.replace("cp ", "").split(' ')[0];
      let newFileName = str.replace("cp ", "").split(' ')[1];
      await copy(filePath, newFileName);
      break;
    }
    case commands.move.test(str): {
      let filePath = str.replace("mv ", "").split(' ')[0];
      let newFileName = str.replace("mv ", "").split(' ')[1];
      await copy(filePath, newFileName);
      await remove(filePath)
      break;
    }
    case commands.create.test(str): {
      await create(str.replace("add ", ""));
      break;
    }
    case commands.hash.test(str): {
      await calculateHash(str.replace("hash ", ""));
      break;
    }
    case commands.cd.test(str): {
      navigateTo(str.replace("cd ", ""));
      break;
    }
    case commands.compress.test(str): {
      let filePath = str.replace("compress ", "").split(' ')[0];
      let newFileName = str.replace("compress ", "").split(' ')[1];
      await compress(filePath, newFileName);
      break;
    }  case commands.decompress.test(str): {
      let filePath = str.replace("decompress ", "").split(' ')[0];
      let newFileName = str.replace("decompress ", "").split(' ')[1];
      await decompress(filePath, newFileName);
      break;
    }
    case commands.homedir.test(str): {
      console.log(os.homedir());
      break;
    }
    case commands.username.test(str): {
      console.log(os.userInfo().username);
      break;
    }
    case commands.architecture.test(str): {
      console.log(process.arch);
      break;
    }
    case commands.cpus.test(str): {
      console.log(cpus());
      break;
    }
    case commands.eol.test(str): {
      console.log(JSON.stringify(os.EOL));
      break;
    }
    default: {
      console.log('Invalid input');
    }
  }
});
