import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {formatBytes} from '../store/fileSystem/util'
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function FileDetails(props) {
  const classes = useStyles();
    const {anchor, handleClose, file} = props;
    const totalSize = useSelector(({fileSystem}) => {
      if(file.filesys_type==="FILE"){
        return file.size
      }
    if( file.children.length === 0){
      return 0;
    }
      const childrenSizes = file.children.map(id => {
        console.log(fileSystem.find(file => file.id === id)["size"])
        return fileSystem.find(file => file.id === id)["size"];
      });
      console.log(childrenSizes)

      return childrenSizes.reduce((prev, curr) => prev+curr);
  });

 

  const open = Boolean(anchor);
  
  return (
    <div>
     
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        elevation={2}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}
        keepMounted
        disableRestoreFocus
      >
        <Grid container direction="column" spacing={1}>
          <Grid item>
          <Typography variant="caption">{`Type: ${file.filesys_type==="FOLDER"?"Folder":file.type}`}</Typography>

          </Grid>
          <Grid item>
          <Typography variant="caption">{`Size: ${formatBytes(totalSize)}`}</Typography>

          </Grid>
          <Grid item>
          <Typography variant="caption">{`Created Date: ${file.createdDate}`}</Typography>

          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}
