import React from 'react';
import {useSelector} from 'react-redux' 
import { Link } from 'react-router-dom';
import {Grid, Container, List, Drawer, CssBaseline, Typography } from '@material-ui/core';
import Icon from './Icon'
import { Switch, Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';
import {generateId} from '../store/fileSystem/util'
export default function FileView(props){
    const {rootdir, url} = props
    const [selectedFiles, setSelectedFiles] = React.useState([]);

  
    const children = useSelector(({fileSystem}) => {
        console.log(fileSystem)
        const file = fileSystem.find(el => el.id=== ((rootdir==="root")?"ROOT":generateId(url)));
        if(!file){
            return [];
        }
        console.log(file)
        const children_arr_names = file["children"];
        console.log(children_arr_names)
        console.log(children_arr_names.map(id => fileSystem.find(obj => obj.id===id)))
        return children_arr_names.map(id => fileSystem.find(obj => obj.id===id));

    });
    console.log(children)
    return (
        <>
        
        {children.map(child => 
        {   
            const isSelectedFile = selectedFiles.includes(child.id);
            return (
                <Grid item>
                <Icon file={child} rootdir={rootdir} url={url} selectedFiles={selectedFiles} isSelectedFile={isSelectedFile} updateSelectedFiles={setSelectedFiles}/>
              </Grid>
            )
        }
          
           )}
            
        </>
       
    );
}