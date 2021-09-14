import React from 'react';
import {Grid, Container, List, Drawer, CssBaseline, Typography, Button } from '@material-ui/core';
import SearchBox from './SearchBox';
import FolderIcon from '@material-ui/icons/Folder';
import Icon from './Icon'
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {addFiles} from '../store/fileSystem/action'
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
    return (
        <div >
            <Grid item container justify="space-between" spacing={2}>
              <Grid item>
                <Typography variant="h4">{rootDir}</Typography>
              </Grid>
              <Grid item>
                <Button size="small" variant="outlined" >Create Folder</Button>
              </Grid>
              <Grid item>
                <Button size="small" variant="outlined" onClick={openUploadDialog}>Create File</Button>
              </Grid>
            </Grid>

            <input id='upload-file' ref={uploadRef} onChange={handleFileChange} type='file' hidden/>
        </div>
    );
}