import React, {useEffect, useState} from 'react';
import './report2.css'
import {withRouter} from 'react-router-dom';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import TextField from "@material-ui/core/TextField/TextField";


function Report(props) {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        getReport();
    },[limit]);

    function getReport() {
        axios.get('http://localhost:8000/report-generation', {
            params: {
                limit: limit
            }
        }).then((response) => {
            console.log(response.data);
            setData(response.data);
        }).catch(error => {
            console.warn(error);
        });
    }


    return (
        <div className={"report-container"}>
            <div className={"text-field"}>
                    <TextField
                        id="outlined-required"
                        label="Artist"
                        fullWidth
                        variant="outlined"

                    />
            </div>
            <div>
                <Button color="primary" onClick={()=>setLimit(10)}>TOP 10 Playlists</Button>
            </div>
            <h2 style={{textAlign: "center"}}> Playlists with {producer} </h2>
            {data.length > 0 ?
                <div className={"flexer"}>
                    <Grid container spacing={0}>
                        {data.map((playlist, index)=> (
                            <Grid key={index} container item spacing={0} xs={12}>
                                <div className={"playlist-block"}>
                                    <div className={"name-block"}>
                                        <span className={"mini-header"}>Playlist: </span> {playlist.name}
                                    </div>
                                    <div className={"genre"}>
                                        <span className={"mini-header"}>Genre: </span> {playlist.genre}
                                    </div>
                                    <div className={"producers"}>
                                        <span className={"mini-header"}>Artist: </span> {album.producer}
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>:
                <CircularProgress />
            }
        </div>
    )
}

export default withRouter(Report);
