export const ADD_FOLDER = "ADD_FOLDER";
export const ADD_FILES = "ADD_FILE";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const DELETE_FILE = "DELETE_FILE";

export const addFolder = (rootDir) => {
  return { type: ADD_FOLDER, rootDir};
};
export const addFiles = (files, rootDir) => {
  return { type: ADD_FILES, files, rootDir };
};
export const deleteFolder = (fileName, rootDir) => {
  return { type: DELETE_FOLDER, fileName, rootDir };
};
export const deleteFile = () => {
  return { type: DELETE_FILE };
};

