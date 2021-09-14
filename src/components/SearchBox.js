import React from 'react';
import {Autocomplete } from '@material-ui/lab'
import {TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {useSelector} from 'react-redux';
export default function SearchBox(props){
    const {fileSystemData} = props;
    const files = useSelector(({fileSystem}) => {
      if(fileSystem){
        return fileSystem.filter(file => file.type==="FILE")
      }
    });
    return (
        <Autocomplete
        id="country-select-demo"
        style={{ width: 300 }}
        options={files}
        autoHighlight
        getOptionLabel={(option) => option.name}
        
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            placeholder="Search files"
            // InputProps={{
            //     startAdornment: (
            //       <InputAdornment position="start">
            //         <SearchIcon />
            //       </InputAdornment>
            //     ),
            //   }}
          />
        )}
      />
    );
}