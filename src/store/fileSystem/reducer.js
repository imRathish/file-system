import {
  ADD_FOLDER,
  ADD_FILES,
  DELETE_FOLDER,
  RENAME_FILE
} from "./action";
import { generateId } from '../../utils/util';
import { ROOTNAME, filesys_types, NEWFOLDER_NAME } from "../../Constants";
const initialState = [
  { filesys_type: "ROOT", id: "ROOT", name: ROOTNAME, children: [] },
];

export default function fileSystemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLDER: {
      const folderName = NEWFOLDER_NAME
      const newFolderId = generateId(action.parentPath, folderName);

      // Update the parent folder's children
      const newstate = state.map((file) => {
        if (file.id === action.rootDirId) {
          return { ...file, children: file.children.concat(newFolderId) }
        }
        return file;
      })
      // Add new entry for the new folder
      const currDate = new Date();
      return [
        ...newstate,
        { filesys_type: filesys_types["FOLDER"], size: 0, id: newFolderId, name: folderName, parent: action.rootDirId, children: [], createdDate: `${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}` },
      ];
    }
    case ADD_FILES: {

      // Update the parent folder's children 
      const newstate = state.map(file => {
        if (file.id === action.rootDirId) {
          const fileList = Object.values(action.files)
          if (fileList.length === 0) {
            return
          }
          return {
            ...file, size: (file.size + fileList.map(file => file.size).reduce((prev, curr) => prev + curr)), children: file.children.concat(...fileList.map(file => {
              return generateId(action.parentPath, file.name)
            }))
          }
        }
        return file
      });

      // Add new entry for the new file
      const currDate = new Date();
      return [
        ...newstate,
        ...(Object.values(action.files)).map(file => {
          return { filesys_type: filesys_types["FILE"], id: generateId(action.parentPath, file.name), parent: action.rootDirId, name: file.name, size: file.size, type: file.type, createdDate: `${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}` }
        })
      ];
    }
    case DELETE_FOLDER: {
      const newstate = state.map((file) => {
        // Remove folder's entry from its parent
        if (file.id === action.rootDirId) {
          return { ...file, children: file.children.filter(child => !action.fileIds.includes(child)) }
        }

        return file;
      })
        // Remove the folder's entry and remove its children
        .filter(file => !action.fileIds.includes(file.id) && !action.fileIds.includes(file.parent))
      return newstate
    }

    case RENAME_FILE: {
      const newState = state.map((file) => {
        // Restricting the new name to apply for the filename before extension
        if (file.id === action.oldFileId) {
          file.id = action.newFileId;
          if (file.filesys_type === filesys_types["FILE"]) {
            let extension = file.name.split(".")[1]
            file.name = `${action.newFileName}.${extension}`
          } else {
            file.name = action.newFileName;
          }

        }
        // Updating parent's children 
        if (file.id === action.rootDirId) {
          file["children"] = file["children"].map(fileId => {
            if (fileId === action.oldFileId) {
              return action.newFileId;
            }
            return fileId;
          })
        }
        // Update children if it is a folder
        if (action.filesys_type === filesys_types["FOLDER"] && file.parent === action.oldFileId) {
          file.parent = action.newFileId
        }
        return file;
      });
      return newState;
    }

    default:
      return state;
  }
}
