import React from 'react';
import { Grid, Container, List, Drawer, CssBaseline, Typography } from '@material-ui/core';
import SearchBox from './SearchBox';
import FileView from './FileView'
import { makeStyles } from '@material-ui/core/styles';
import Actions from './Actions'
import { Switch, Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function FileList() {
  const classes = useStyles();
  const { fileName } = useParams();
  const { url, isExact } = useRouteMatch();

  return (
    <div >
      {isExact && <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={5}>
          <Grid item container justify="space-between">
            <Grid item>
              <Typography variant="h6">{fileName}</Typography>
            </Grid>
            <Grid item>
              <Actions rootDir={fileName} url={url} />
            </Grid>
            {/* <Grid item>
              <SearchBox />
            </Grid> */}
          </Grid>
          <Grid item container spacing={5}>
            {/* <Switch>
                    <Route path="/:fileName">
                        <FileView/>
                    </Route>
                    <Route path="/">
                        <Redirect to="/root" />
                    </Route>
                </Switch> */}
            <FileView rootdir={fileName} url={url} />

          </Grid>

        </Grid>

      </Container>}
      <Switch>
        <Route path={`${url}/:fileName`}>
          <FileList />
        </Route>
      </Switch>
    </div>
  );
}