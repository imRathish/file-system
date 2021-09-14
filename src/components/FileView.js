import {useSelector} from 'react-redux' 
import { Link } from 'react-router-dom';
import {Grid, Container, List, Drawer, CssBaseline, Typography } from '@material-ui/core';
import Icon from './Icon'
import { Switch, Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';

export default function FileView(props){
    const {fileName} = useParams();
    const {rootdir, url} = props
    const children = useSelector(({fileSystem}) => {
        const children_arr_names = fileSystem.find(el => el.name===fileName)["children"];
        return children_arr_names.map(name => fileSystem.find(obj => obj.name===name));

    });

    return (
        <>
        
        {children.map(child => 
            <Grid item>
              <Icon file={child} rootdir={rootdir} url={`${url}/${child.name}`}/>
            </Grid>
           )}
            
        </>
       
    );
}