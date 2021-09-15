import React from 'react';
import {Grid, Container, List, Drawer, CssBaseline, Typography, Button } from '@material-ui/core';
import SearchBox from './SearchBox';
import FolderIcon from '@material-ui/icons/Folder';
import Icon from './Icon'
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {addFiles} from '../store/fileSystem/action'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PublishIcon from '@material-ui/icons/Publish';
import { addFolder } from '../store/fileSystem/action';

const useStyles = makeStyles((theme) => ({

    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));

export default function FileList(props){
    const classes = useStyles();
    const {rootDir} = props;
    const dispatch = useDispatch();
    const uploadRef = React.useRef(null);
    const openUploadDialog = () => {
      uploadRef.current.click();
    }
    const handleFileChange = (e) => {
      console.log(e.target.files)
      dispatch(addFiles(e.target.files, rootDir));
    }
    const handleCreateFolder = () => {
      console.log(rootDir)
      dispatch(addFolder(rootDir));
      //handleClose();
    }
    return (
        <div >
            <Grid item container alignItems="center" spacing={3}>
              <Grid item>
                <Typography variant="h6">{rootDir}</Typography>
              </Grid>
              <Grid item>
                <Button size="small" variant="text" startIcon={<CreateNewFolderIcon style={{color: "#F8D775" }} />} onClick={handleCreateFolder}>New folder</Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="text" startIcon={<PublishIcon style={{color: "green" }} />} onClick={openUploadDialog}>Upload File</Button>
              </Grid>
            </Grid>

            <input id='upload-file' ref={uploadRef} onChange={handleFileChange} type='file' hidden/>
        </div>
    );
}