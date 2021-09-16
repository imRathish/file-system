import {
  ADD_FOLDER,
  ADD_FILES,
  DELETE_FOLDER,
  RENAME_FILE
} from "./action";
//import { simulateWaterFlow } from "./util";
import {generateId} from './util'
const initialState = [
  {filesys_type:"ROOT", id:"ROOT", name:"root",children:[]},
  // {type:"FOLDER", name: "rathish", parent: "root", children:["lol.txt","rohit"]},
  // {type:"FILE", name: "lol.txt", parent: "rathish"},
  // {type:"FOLDER", name: "rohit", parent: "rathish", children:["hh"]},
  // {type:"FILE", name: "hh", parent: "rohit"},

];

export default function fileSystemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLDER: {
      const folderName = "New folder"
      const newFolderId = generateId(action.parentPath, folderName);
      const newstate = state.map((file) => {
        if(file.id === action.rootDirId){
          return {...file, children:file.children.concat(newFolderId)}
        }
        return file;
      })
      const currDate = new Date();
      return [
        ...newstate,
        {filesys_type:"FOLDER", id:newFolderId, name:folderName, parent: action.rootDirId, children:[], createdDate: `${currDate.getDate()}/${currDate.getMonth()+1}/${currDate.getFullYear()}`},
      ];
    }
    case ADD_FILES: {
      const newstate = state.map(file => {
        if(file.id === action.rootDirId){
          const fileList = Object.values(action.files)
          if(fileList.length === 0){
            return
          }
          return {...file, size:(file.size+fileList.reduce((prev, curr) => prev+curr)), children: file.children.concat(...fileList.map(file => {
            return generateId(action.parentPath, file.name)
          }))}
        }
        return file
      })
      const currDate = new Date();
      return [
        ...newstate,
        ...(Object.values(action.files)).map(file => {
          return {filesys_type:"FILE", id: generateId(action.parentPath, file.name), parent: action.rootDirId, name: file.name, size: file.size, type: file.type, createdDate: `${currDate.getDate()}/${currDate.getMonth()+1}/${currDate.getFullYear()}`}
        })
      ];
    }
    case DELETE_FOLDER: {
      console.log(state)
      const newstate = state.map((file) => {
        if(file.id === action.rootDirId){
          return {...file, children:file.children.filter(child=> !action.fileIds.includes(child))}
        }
       
        return file;
      }).filter(file => !action.fileIds.includes(file.id) && !action.fileIds.includes(file.parent) )
      return newstate
    }
 
    case RENAME_FILE: {
      const newState = state.map((file) => {
        if(file.id === action.oldFileId){
          file.id = action.newFileId;
          if(file.filesys_type==="FILE"){
            let extension = file.name.split(".")[1]
            file.name = `${action.newFileName}.${extension}`
          }else{
            file.name = action.newFileName;
          }

        }
        if(file.id === action.rootDirId){
          file["children"] = file["children"].map(fileId => {
            if(fileId === action.oldFileId){
              return action.newFileId;
            }
            return fileId;
          })
        }
        if(action.filesys_type==="FOLDER" && file.parent === action.oldFileId){
          file.parent = action.newFileId
        }
        return file;
      });
      console.log(newState)
      return newState;
    }
   
    default:
      return state;
  }
}
