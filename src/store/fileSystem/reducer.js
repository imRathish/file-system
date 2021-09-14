import {
  ADD_FOLDER,
  ADD_FILES,
  DELETE_FOLDER,
  DELETE_FILE
} from "./action";
//import { simulateWaterFlow } from "./util";

const initialState = [
  {type:"ROOT", name:"root",children:["rathish"]},
  {type:"FOLDER", name: "rathish", parent: "root", children:["lol.txt","rohit"]},
  {type:"FILE", name: "lol.txt", parent: "rathish"},
  {type:"FOLDER", name: "rohit", parent: "rathish", children:["hh"]},
  {type:"FILE", name: "hh", parent: "rohit"},

];

export default function fileSystemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLDER: {
      const folderName = "New Folder"
      const newstate = state.map((file) => {
        if(file.name === action.rootDir){
          return {...file, children:file.children.concat(folderName)}
        }
        return file;
      })
      return [
        ...newstate,
        {type:"FOLDER", name:folderName, parent: action.rootDir, children:[]},
      ];
    }
    case ADD_FILES: {
      const newstate = state.map(file => {
        if(file.name === action.rootDir){
          return {...file, children: file.children.concat(...(Object.values(action.files)).map(file => file.name))}
        }
        return file
      })
    
      return [
        ...newstate,
        ...(Object.values(action.files)).map(file => {
          return {type:"FILE", name:file.name, parent: action.rootDir}
        })
      ];
    }
    case DELETE_FOLDER: {
      const newstate = state.map((file) => {
        if(file.name === action.rootDir){
          return {...file, children:file.children.filter(child=> child !==action.fileName)}
        }
       
        return file;
      }).filter(file => file.name !== action.fileName && file.parent !== action.fileName )
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
   
    default:
      return state;
  }
}
