import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Divider } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import StorageIcon from '@material-ui/icons/Storage';
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';
import FolderIcon from '@material-ui/icons/Folder';
import { filesys_types } from '../../Constants';
import Cloud from '@material-ui/icons/Cloud';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    marginTop: 20
  },
}));

export default function RecursiveTreeView() {
  const classes = useStyles();
  const filesystem = useSelector(({ fileSystem }) => {
    return fileSystem;
  });
  const history = useHistory();

  const handleItemClick = (file) => {
    if (file.filesys_type === filesys_types["FOLDER"]) {
      history.push(atob(file.id));
      return;
    }
    if (file.filesys_type === filesys_types["ROOT"] || file.parent === "ROOT") {
      history.push("/");
      return;
    }
    history.push(atob(file.parent));
  }

  const renderTree = (filesystem, rootDir = "ROOT") => {
    const rootDirObj = filesystem.find(file => file.id === rootDir)
    return (
      <TreeItem key={rootDirObj.id} nodeId={rootDirObj.id} label={
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            {renderIcon(rootDirObj.filesys_type)}
          </Grid>
          <Grid item>
            <Typography variant="body2" className={classes.labelText}>
              {rootDirObj.name}
            </Typography>
          </Grid>
        </Grid>

      }
        onClick={() => { handleItemClick(rootDirObj) }}
      >
        {Array.isArray(rootDirObj.children) ? rootDirObj.children.map((node) => renderTree(filesystem, node)) : null}
      </TreeItem>
    )
  };

  return (
    <div>
      <Grid container direction="column" spacing={2} >
        <Grid item container spacing={3} alignItems="center">
          <Grid item>
            <Cloud style={{ fontSize: 40, color: "#6b96e4" }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">Asset Drive</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(filesystem)}
          </TreeView>
        </Grid>
      </Grid>

    </div>
  );
}

const renderIcon = (filesys_type) => {
  if (filesys_type === "ROOT") {
    return <StorageIcon />
  } else if (filesys_type === filesys_types["FILE"]) {
    return <DescriptionSharpIcon style={{ color: "#7d7d7d" }} />
  } else if (filesys_type === filesys_types["FOLDER"]) {
    return <FolderIcon style={{ color: "#F8D775" }} />
  }
}