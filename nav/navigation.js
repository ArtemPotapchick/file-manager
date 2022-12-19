const navigateTo = (dirPath) => {
  try {
    process.chdir(dirPath);
    console.log(`You are currently in ${process.cwd()}`);
  } catch (e) {
    console.log('Operation failed!');
  }
};
export default navigateTo;
