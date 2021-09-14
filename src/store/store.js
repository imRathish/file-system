import {createStore} from 'redux';
import fileSystemReducer from './fileSystem/reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({fileSystem: fileSystemReducer});

export default createStore(rootReducer);