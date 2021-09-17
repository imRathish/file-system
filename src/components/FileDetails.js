import React from 'react';
import { useSelector } from 'react-redux'
import { formatBytes } from '../store/fileSystem/util';
import { filesys_types } from '../Constants'
import { Popover, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  const { anchor, handleClose, file } = props;
  const totalSize = useSelector(({ fileSystem }) => {
    if (file.filesys_type === filesys_types["FILE"]) {
      return file.size
    }
    if (file.children.length === 0) {
      return 0;
    }
    const childrenSizes = file.children.map(id => {
      return fileSystem.find(file => file.id === id)["size"];
    });
    return childrenSizes.reduce((prev, curr) => prev + curr);
  });

  const totalSize_formatted = formatBytes(totalSize)

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
            <Typography variant="caption">{`Type: ${file.filesys_type === filesys_types["FOLDER"] ? "Folder" : file.type}`}</Typography>

          </Grid>
          <Grid item>
            {totalSize_formatted!==NaN && <Typography variant="caption">{`Size: ${totalSize_formatted}`}</Typography>}

          </Grid>
          <Grid item>
            <Typography variant="caption">{`Created Date: ${file.createdDate}`}</Typography>

          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}
