import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {useSelector} from 'react-redux' 


const useStyles = makeStyles({
  root: {
    //height: 110,
    flexGrow: 1,
    maxWidth: 400,
    marginTop: 20
  },
});


export default function RecursiveTreeView() {
  const classes = useStyles();
  const filesystem = useSelector(({fileSystem}) => {
    return fileSystem;

});


  const renderTree = (filesystem, rootDir="ROOT") => {
    const rootDirObj = filesystem.find(file => file.id === rootDir)
    console.log(rootDirObj)
    return(
    <TreeItem key={rootDirObj.id} nodeId={rootDirObj.id} label={rootDirObj.name}>
      {Array.isArray(rootDirObj.children) ? rootDirObj.children.map((node) => renderTree(filesystem, node)) : null}
    </TreeItem>
    )
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(filesystem)}
    </TreeView>
  );
}
