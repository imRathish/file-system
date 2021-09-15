import React from 'react';

import { Paper } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
import { Grid, Container, List, Drawer, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { renameFile, deleteFolder } from '../store/fileSystem/action';
import FileDetails from './FileDetails';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import RenameDialog from './RenameDialog';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 2,
    '&:hover': {
      backgroundColor: '#cde7fe',
    },
  },

}));


export default function Icon(props) {
  const { name, filesys_type  } = props.file;
  const { url, rootdir, isSelectedFile, selectedFiles, updateSelectedFiles } = props;
  const [fileDetailsAnchor, setFileDetailsAnchor] = React.useState(null);
  const [openRenameDialog, setOpenRenameDialog] = React.useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const [cursorPosition, setCursorPosition] = React.useState({
    mouseX: null,
    mouseY: null,
  });

  const handleDoubleClick = () => {
    if (filesys_type === "FILE") {
      return;
    }
    history.push(url)
  }
  const handleClick = (event) => {
    event.preventDefault();
    setFileDetailsAnchor(null);
    if(selectedFiles.length>0 && !isSelectedFile){
      updateSelectedFiles([]);
    }
    if (cursorPosition.mouseX !== 0 || cursorPosition.mouseY !== 0) {
      setCursorPosition({
        mouseX: null,
        mouseY: null,
      });
    }
    setCursorPosition({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };
  const handleClose = () => {
    setCursorPosition({
      mouseX: null,
      mouseY: null,
    });
  };

  const handleDeleteFolder = () => {
    if(selectedFiles.length>0){
      dispatch(deleteFolder(selectedFiles, rootdir));
    }else{
      dispatch(deleteFolder([name], rootdir));
    }
    handleClose();
  }
  const handleFileDetailsOpen = (event) => {
    console.log(event.ctrlKey)
    if(event.ctrlKey && filesys_type!=="FOLDER"){
      if(isSelectedFile){
        updateSelectedFiles(selectedFiles.filter(fileName => fileName !== name ));
      }else{
        updateSelectedFiles([...selectedFiles, name]);
      }
      return;
    }
    console.log([name])
    //updateSelectedFiles([name]);
    setFileDetailsAnchor(event.currentTarget);
  };
  const handleFileDetailsClose = () => {
    setFileDetailsAnchor(null);
  };
  const handleDownload = () => {
    var element = document.createElement('a');
    element.setAttribute('href', 
    `data:${filesys_type};charset=utf-8, `
    + encodeURIComponent("subbu"));
    element.setAttribute('download', name);
  
  
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  const handleOpenRenameDialog = () => {
    setOpenRenameDialog(true);
  }
  const handleCloseRenameDialog = (newName) => {
    console.log(newName)
    if(newName){
      dispatch(renameFile(name, newName, rootdir, filesys_type))
    }
    setOpenRenameDialog(false);
    handleClose();
  }
  const handleClickAway = (event) => {
    if(event.ctrlKey){
      return;
    }
    updateSelectedFiles([]);
  }
  return (
    <ClickAwayListener onClickAway={handleClickAway}>

    <div className={classes.root} style={{backgroundColor: isSelectedFile?'#cde7fe':null}} onContextMenu={handleClick} onDoubleClick={handleDoubleClick} onClick={handleFileDetailsOpen} onMouseLeave={handleFileDetailsClose}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          {filesys_type === "FOLDER" && <FolderIcon style={{ fontSize: 100, color: "#F8D775" }} />}
          {filesys_type === "FILE" && <DescriptionSharpIcon style={{ fontSize: 100, color: "#7d7d7d" }} />}
        </Grid>
        <Grid item>
          <Typography align="center" variant="caption">{name}</Typography>
        </Grid>
      </Grid>
      <Menu
        keepMounted
        open={cursorPosition.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          cursorPosition.mouseY !== null && cursorPosition.mouseX !== null
            ? { top: cursorPosition.mouseY, left: cursorPosition.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleDeleteFolder}>Delete</MenuItem>
        {selectedFiles.length===0 && <MenuItem onClick={handleOpenRenameDialog}>Rename</MenuItem>}
        <MenuItem onClick={handleDownload}>Download</MenuItem>

      </Menu>
      <FileDetails anchor={fileDetailsAnchor} handleClose={handleFileDetailsClose} file={props.file}/>
      <RenameDialog open={openRenameDialog} handleClose={handleCloseRenameDialog}/>
    </div>
    </ClickAwayListener>

  );
}