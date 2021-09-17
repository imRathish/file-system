import { generateId } from './util';
import { ROOTNAME } from '../../Constants'

export const ADD_FOLDER = "ADD_FOLDER";
export const ADD_FILES = "ADD_FILE";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const RENAME_FILE = "RENAME_FILE";

export const addFolder = (rootDir, parentPath) => {
  return { type: ADD_FOLDER, rootDir, parentPath, rootDirId: rootDir === ROOTNAME ? "ROOT" : generateId(parentPath) };
};
export const addFiles = (files, rootDir, parentPath) => {

  return { type: ADD_FILES, files, rootDir, parentPath, rootDirId: rootDir === ROOTNAME ? "ROOT" : generateId(parentPath) };
};
export const deleteFolder = (fileIds, rootDir, parentPath) => {
  return { type: DELETE_FOLDER, fileIds, rootDir, rootDirId: rootDir === ROOTNAME ? "ROOT" : generateId(parentPath) };
};

export const renameFile = (oldFileId, newFileName, rootDir, filesys_type, parentPath) => {
  return { type: RENAME_FILE, oldFileId, newFileName, rootDirId: rootDir === ROOTNAME ? "ROOT" : generateId(parentPath), newFileId: generateId(parentPath, newFileName), rootDir, filesys_type }
}

