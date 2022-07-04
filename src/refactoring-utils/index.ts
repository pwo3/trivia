/* eslint-disable no-console */
import * as fs from "fs";

const DIRECTORY = "./src/master";

const createDirectoryIfRequired = (): void => {
  if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY);
  }
};

const generateFilePaths = (testIndex: number) => {
  return {
    master: `${DIRECTORY}/master_${testIndex}.txt`,
    actual: `${DIRECTORY}/actual_${testIndex}.txt`,
  };
};

const redirectLogsToFile = (path: string): void => {
  console.log = (text: string): void => {
    // eslint-disable-next-line prefer-template
    fs.appendFileSync(path, text + "\n");
  };
};

const eraseFile = (path: string): void => {
  fs.writeFileSync(path, "");
};

const runGoldenMaster = (testIndex: number, scenario: () => void): void => {
  createDirectoryIfRequired();

  const { master, actual } = generateFilePaths(testIndex);

  const createMaster = (): void => {
    redirectLogsToFile(master);
    scenario();
  };

  const compareActualToMaster = (): void => {
    eraseFile(actual);
    redirectLogsToFile(actual);
    scenario();
    expect(fs.readFileSync(actual)).toEqual(fs.readFileSync(master));
  };

  if (!fs.existsSync(master)) {
    createMaster();
  } else {
    compareActualToMaster();
  }
};

export default runGoldenMaster;
