import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline } from '@material-ui/core';
import FileList from './components/FileList'
import FileTree from './components/FileTree'
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROOTNAME } from './Constants'
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    position: 'relative',
    width: drawerWidth,
    padding: 20
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawer,
        }}
      >

        <FileTree />
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route path="/:fileName">
            <FileList />
          </Route>
          <Route path="/">
            <Redirect to={"/" + ROOTNAME} />
          </Route>
        </Switch>
      </main>
    </div>

  );
}

export default App;