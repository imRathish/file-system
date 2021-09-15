import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
        disableRestoreFocus
      >
        <Grid container direction="column" spacing={1}>
          <Grid item>
          <Typography variant="caption">{`Type: ${file.type}`}</Typography>

          </Grid>
          <Grid item>
          <Typography variant="caption">{`Size: ${formatBytes(file.size)}`}</Typography>

          </Grid>
          <Grid item>
          <Typography variant="caption">{`Created Date: ${file.createdDate}`}</Typography>

          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}
