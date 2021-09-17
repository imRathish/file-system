import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateId } from '../store/fileSystem/util'
import { addFiles } from '../store/fileSystem/action'
import { addFolder } from '../store/fileSystem/action';
import { Grid, Button } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PublishIcon from '@material-ui/icons/Publish';
import Snackbar from '@material-ui/core/Snackbar';
import { NEWFOLDER_NAME } from "../Constants"
export default function Actions(props) {
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
        if (!existingFiles.includes(generateId(url, file.name))) {
          return true
        }
        existing_files_uploaded.push(file.name)
      });
      if (existing_files_uploaded.length > 0) {
        setError("File exists")
      }
      if (uploaded_files.length > 0) {
        dispatch(addFiles(uploaded_files, rootDir, url));
      }
    }
  }


  const handleCreateFolder = () => {
    if (existingFiles.includes(generateId(url, NEWFOLDER_NAME))) {
      setError(`${NEWFOLDER_NAME} already exists`)
      return;
    }
    dispatch(addFolder(rootDir, url));
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

      <input id='upload-file' ref={uploadRef} onChange={handleFileChange} type='file' hidden multiple />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={error ? true : false}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        message={error}
      />
    </div>
  );
}