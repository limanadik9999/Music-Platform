import React, {useEffect, useState} from 'react';
import "./main-page.css";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import Grid from "@material-ui/core/Grid";


function HomePage(props) {
    const [albums, setAlbums] = useState(null);
    const [albumsFullList, setFullList] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/albums', {
        }).then((response) => {
            setAlbums(response.data);
            setFullList(response.data);
        }).catch(error => {
            console.warn(error);
        });
    },[]);

    function goToAlbumDetails(id) {
        props.history.push(`/album/${id}`);
        const data = {
            id: id
        };
        axios.post(
            'http://localhost:8000/popularity-update', data
        ).then(resp => {
        }).catch(error => {
            console.warn(error);
        });
    }

    function findAlbum(event) {
        const value = event.target.value;
        setAlbums(albumsFullList.filter((album) => {
            return album.name.toLowerCase().includes(value.toLowerCase());
        }));
    }

    return (
        <div className={"page-container"}>
            <div className={"search-bar"}>
            <Input placeholder="Search" onChange={(e) => findAlbum(e)}/>
            </div>
            {albums ?
                <Grid className={"album-container"} container spacing={8}>
                    {albums.map((album, index)=> (
                        <Grid key={index} container item spacing={3} xs={12} sm={6} md={3}>
                            <div className={"album-card"}
                                 style={{
//                                     backgroundImage: 'url(' + require(`../../assets/posters/${albums.image}.jpg`) + ")",
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center'
                                 }}
                                 onClick={()=>goToAlbumDetails(album.id)}
                            >
                                <div className={"album-info"}>
                                    {/* TODO: SHOW NAME, CATEGORY and black-background*/}
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid> :
                <CircularProgress />
            }

        </div>
    )
}

export default withRouter(HomePage);
