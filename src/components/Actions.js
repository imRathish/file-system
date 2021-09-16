import React from 'react';
import { Grid, Container, List, Drawer, CssBaseline, Typography, Button } from '@material-ui/core';
import SearchBox from './SearchBox';
import FolderIcon from '@material-ui/icons/Folder';
import Icon from './Icon'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addFiles } from '../store/fileSystem/action'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PublishIcon from '@material-ui/icons/Publish';
import { addFolder } from '../store/fileSystem/action';
import { useSelector } from 'react-redux';
import { generateId } from '../store/fileSystem/util'
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Actions(props) {
  const classes = useStyles();
  const { rootDir, url } = props;
  const dispatch = useDispatch();
  const uploadRef = React.useRef(null);
  const [error, setError] = React.useState(null);
  const existingFiles = useSelector(({ fileSystem }) => {
    return fileSystem.map(file => file.id).filter(id => id !== "ROOT")
  })
  const openUploadDialog = () => {
    uploadRef.current.click();
  }
  const handleFileChange = (e) => {
    let uploaded_files = Object.values(e.target.files);
    if (uploaded_files.length > 0) {
      const existing_files_uploaded = []

    uploaded_files = uploaded_files.filter(file => {
      if(!existingFiles.includes(generateId(url, file.name.split(".")[0]))){
        return true
      }
      existing_files_uploaded.push(file.name)
    });
    console.log(existing_files_uploaded);
    console.log(uploaded_files)
    if(existing_files_uploaded.length>0){
      setError("Files exist - " + existingFiles.join(", "))
    }
    if(uploaded_files.length > 0){
      dispatch(addFiles(uploaded_files, rootDir, url));
    }
  }
      }
     
  
  const handleCreateFolder = () => {
    console.log(rootDir)
    if (existingFiles.includes(generateId(url, "New folder"))) {
      setError("New folder already exists")
      return;
    }
    dispatch(addFolder(rootDir, url));
    //handleClose();
  }
 
  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };
  return (
    <div >
      <Grid item container alignItems="center" spacing={3}>
       
        <Grid item>
          <Button size="small" variant="text" startIcon={<CreateNewFolderIcon style={{ color: "#F8D775" }} />} onClick={handleCreateFolder}>New folder</Button>
        </Grid>
        <Grid item>
          <Button size="small" variant="text" startIcon={<PublishIcon style={{ color: "green" }} />} onClick={openUploadDialog}>Upload File</Button>
        </Grid>
      </Grid>

      <input id='upload-file' ref={uploadRef} onChange={handleFileChange} type='file' hidden />
      <Snackbar
       anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
        open={error?true:false}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        message={error}
        //action={action}
      />
    </div>
  );
}