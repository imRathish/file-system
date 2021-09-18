import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from './Icon'
import { Grid, Typography } from '@material-ui/core';
import { generateId } from '../../utils/util';
import addFilesImg from '../../images/addFiles.png';
import { ROOTNAME } from '../../Constants'

export default function FilesView(props) {
    const { rootdir, url } = props
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const history = useHistory();

    const children = useSelector(({ fileSystem }) => {
        const file = fileSystem.find(el => el.id === ((rootdir === ROOTNAME) ? "ROOT" : generateId(url)));
        if (!file) {
            history.push("/");
            return []
        }
        const children_arr_names = file["children"];
        return children_arr_names.map(id => fileSystem.find(obj => obj.id === id));

    });
    return (
        <>

            {children.length > 0 ? children.map(child => {
                const isSelectedFile = selectedFiles.includes(child.id);
                return (
                    <Grid item>
                        <Icon file={child} rootdir={rootdir} url={url} selectedFiles={selectedFiles} isSelectedFile={isSelectedFile} updateSelectedFiles={setSelectedFiles} />
                    </Grid>
                )
            }

            )
                :
                <Grid item container spacing={2} justify="center" alignItems="center" style={{ marginTop: "20vh" }} direction="column">
                    <Grid item >
                        <img src={addFilesImg} style={{ width: "100%", height: 200 }}></img>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Start uploading files.....</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">Note: Only meta data of the files are used while uploading and downloading assets. Contents of the assets are not stored</Typography>
                    </Grid>
                </Grid>
            }

        </>

    );
}