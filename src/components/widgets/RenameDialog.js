import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import { generateId } from '../../utils/util';

export default function RenameDialog(props) {
  const { open, fileName, url, handleClose } = props;
  const [newName, setNewName] = React.useState(null);
  const [error, setError] = React.useState(null);
  const existingFiles = useSelector(({ fileSystem }) => {
    return fileSystem.map(file => file.id).filter(id => id !== "ROOT")
  })

  const handCloseDialog = (newName) => {
    if (newName) {
      if (!isDuplicate(newName)) {
        handleClose(newName);
        setError(null);
        return;
      } else {
        setError("File/Folder already exists! Give a different name")
        return;
      }

    }
    setError(null);
    handleClose()
  }
  const isDuplicate = (newName) => {
    return existingFiles.includes(generateId(url, newName));
  }

  return (

    <Dialog open={open} onClose={() => { handCloseDialog(null) }} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{`Rename ${fileName}`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={error ? true : false}
          helperText={error}
          margin="dense"
          id="new-file-name"
          placeholder={`Enter new name`}
          fullWidth
          onChange={(e) => { setNewName(e.target.value) }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { handCloseDialog(null) }} color="primary">
          Cancel
        </Button>
        <Button onClick={() => { handCloseDialog(newName) }} color="primary">
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
}
