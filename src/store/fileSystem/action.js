export const ADD_FOLDER = "ADD_FOLDER";
export const ADD_FILES = "ADD_FILE";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const DELETE_FILE = "DELETE_FILE";
export const RENAME_FILE = "RENAME_FILE";

export const addFolder = (rootDir) => {
  return { type: ADD_FOLDER, rootDir};
};
export const addFiles = (files, rootDir) => {
  return { type: ADD_FILES, files, rootDir };
};
export const deleteFolder = (fileNames, rootDir) => {
  return { type: DELETE_FOLDER, fileNames, rootDir };
};
export const deleteFile = () => {
  return { type: DELETE_FILE };
};

export const renameFile = (oldFileName, newFileName, rootDir, filesys_type) => {
  return {type: RENAME_FILE, oldFileName, newFileName, rootDir, filesys_type}
}

