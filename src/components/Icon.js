import React from 'react';

import { Paper } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
import {Grid, Container, List, Drawer, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory  } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addFolder, deleteFolder} from '../store/fileSystem/action';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      padding: 2,
      '&:hover': {
        backgroundColor: '#cde7fe',
    },
    },
    
  }));

  
export default function (props) {
    const {name, type} = props.file;
    const {url, rootdir} = props;
    const dispatch = useDispatch();
    
    const classes = useStyles();
    const history = useHistory();
    const [cursorPosition, setCursorPosition] = React.useState({
        mouseX: null,
        mouseY: null,
      });
    
    const handleLinkClick = () => {
        if(type === "FILE"){
            return;
        }
        history.push(url)
    }
    const handleClick = (event) => {
        event.preventDefault();
        if(cursorPosition.mouseX!==0 || cursorPosition.mouseY!==0){
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
      const handleCreateFolder = () => {
        dispatch(addFolder(rootdir));
        handleClose();
      }
      const handleDeleteFolder = () => {
        dispatch(deleteFolder(name, rootdir));
        handleClose();
      }
    return (
        <div className={classes.root} onContextMenu={handleClick} onDoubleClick={handleLinkClick}>
            <Grid container direction="column" alignItems="center">
                <Grid item>
                {type==="FOLDER" && <FolderIcon style={{ fontSize: 100, color: "#F8D775" }} />}
                {type==="FILE" && <DescriptionSharpIcon  style={{ fontSize: 100, color: "#7d7d7d" }}/>}
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
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={handleCreateFolder}>New Folder</MenuItem>
      </Menu>
        </div>
      
    );
}