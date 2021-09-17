import React from 'react';
import { Grid, Container, Typography, IconButton } from '@material-ui/core';
import FileView from './FileView'
import { makeStyles } from '@material-ui/core/styles';
import Actions from './Actions'
import { Switch, Route, useParams, useRouteMatch, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }
  return (
    <div >
      {isExact && <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={5}>
          <Grid item container justify="space-between">
            <Grid item container spacing={3} md={6} alignItems="center">
              <Grid item>
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h5">{fileName}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Actions rootDir={fileName} url={url} />
            </Grid>

          </Grid>
          <Grid item container spacing={5}>
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