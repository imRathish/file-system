import {
  ADD_FOLDER,
  ADD_FILES,
  DELETE_FOLDER,
  DELETE_FILE,
  RENAME_FILE
} from "./action";
//import { simulateWaterFlow } from "./util";

const initialState = [
  {filesys_type:"ROOT", name:"root",children:[]},
  // {type:"FOLDER", name: "rathish", parent: "root", children:["lol.txt","rohit"]},
  // {type:"FILE", name: "lol.txt", parent: "rathish"},
  // {type:"FOLDER", name: "rohit", parent: "rathish", children:["hh"]},
  // {type:"FILE", name: "hh", parent: "rohit"},

];

export default function fileSystemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLDER: {
      console.log(action)
      const folderName = "New Folder"
      const newstate = state.map((file) => {
        if(file.name === action.rootDir){
          return {...file, children:file.children.concat(folderName)}
        }
        return file;
      })
      return [
        ...newstate,
        {filesys_type:"FOLDER", name:folderName, parent: action.rootDir, children:[]},
      ];
    }
    case ADD_FILES: {
      const newstate = state.map(file => {
        if(file.name === action.rootDir){
          return {...file, children: file.children.concat(...(Object.values(action.files)).map(file => file.name))}
        }
        return file
      })
      const currDate = new Date();
      return [
        ...newstate,
        ...(Object.values(action.files)).map(file => {
          return {filesys_type:"FILE", parent: action.rootDir, name: file.name, size: file.size, type: file.type, createdDate: `${currDate.getDate()}/${currDate.getMonth()+1}/${currDate.getFullYear()}`}
        })
      ];
    }
    case DELETE_FOLDER: {
      const newstate = state.map((file) => {
        if(file.name === action.rootDir){
          return {...file, children:file.children.filter(child=> !action.fileNames.includes(child))}
        }
       
        return file;
      }).filter(file => !action.fileNames.includes(file.name) && !action.fileNames.includes(file.parent) )
      return newstate
    }
    case DELETE_FILE: {
      let newGrid = state.grid;
      for (let i = 0; i < state.rows + 1; i++) {
        for (let j = 0; j < state.columns; j++) {
          if (newGrid[i][j] === -1) {
            newGrid[i][j] = 0;
          }
        }
      }
      return {
        ...state,
        grid: newGrid,
        usedObstructions: [],
      };
    }
    case RENAME_FILE: {
      console.log("hello")
      console.log(action.oldFileName)
      const newState = state.map((file) => {
        if(file.name === action.oldFileName){
          file["name"] = action.newFileName
        }
        if(file.name === action.rootDir){
          file["children"] = file["children"].map(fileName => {
            if(fileName === action.oldFileName){
              return action.newFileName;
            }
            return fileName;
          })
        }
        if(action.filesys_type==="FOLDER" && file.parent === action.oldFileName){
          file.parent = action.newFileName
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
