import React from 'react';
import {useSelector} from 'react-redux' 
import { Link } from 'react-router-dom';
import {Grid, Container, List, Drawer, CssBaseline, Typography } from '@material-ui/core';
import Icon from './Icon'
import { Switch, Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';

export default function FileView(props){
    const {fileName} = useParams();
    const {rootdir, url} = props
    const [selectedFiles, setSelectedFiles] = React.useState([]);

  
    const children = useSelector(({fileSystem}) => {
        const file = fileSystem.find(el => el.name===fileName);
        if(!file){
            return [];
        }
        const children_arr_names = fileSystem.find(el => el.name===fileName)["children"];
        return children_arr_names.map(name => fileSystem.find(obj => obj.name===name));

    });

    return (
        <>
        
        {children.map(child => 
        {
            const isSelectedFile = selectedFiles.includes(child.name);
            return (
                <Grid item>
                <Icon file={child} rootdir={rootdir} url={`${url}/${child.name}`} selectedFiles={selectedFiles} isSelectedFile={isSelectedFile} updateSelectedFiles={setSelectedFiles}/>
              </Grid>
            )
        }
          
           )}
            
        </>
       
    );
}