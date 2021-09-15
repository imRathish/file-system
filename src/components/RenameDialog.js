import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {filesys_types} from './Constants';

export default function RenameDialog(props) {
  const {open, fileName, handleClose} = props; 
  const [newName, setNewName] = React.useState(null);
 


  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`Rename ${fileName}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-file-name"
            placeholder={`Enter new name`}
           fullWidth
           onChange={(e)=>{setNewName(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose()}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleClose(newName)}} color="primary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
