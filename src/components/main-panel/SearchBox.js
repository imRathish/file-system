import React from 'react';
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filesys_types } from '../../Constants';

export default function SearchBox(props) {
  const history = useHistory();
  const files = useSelector(({ fileSystem }) => {
    if (fileSystem) {
      return fileSystem.filter(file => file.filesys_type === "FILE")
    }
  });

  const handleChange = (event, file) => {
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
  return (
    <Autocomplete
      id="country-select-demo"
      style={{ width: 300 }}
      options={files}
      autoHighlight
      getOptionLabel={(option) => `${option.name}`}
      onChange={handleChange}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          placeholder="Search files"

        />
      )}
    />
  );
}