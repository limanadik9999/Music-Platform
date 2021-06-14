import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import "./menu.css";
import {withRouter} from "react-router-dom";
import auth from "../../services/auth";
import axios from "axios";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function MyAppBar(props) {

    function logOut() {
        auth.logout();
        props.history.push('/login');
    }

    function migrate() {
        axios.get('http://localhost:8000/migrate', {
        }).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.warn(error);
        });
    }

    return (
        <AppBar position="static" color={"default"}>
            <Toolbar>
                <div className={"title"}>
                     Music Platform
                </div>
                <Switch color="secondary" labelPlacement="End" label = "Switch to MongoDB" onChange={migrate}></Switch>
                <Button color="inherit" onClick={() => props.history.push('/')}>Home</Button>
                {auth.isAuthenticated() && <Button color="inherit" onClick={() => props.history.push('/playlists')}>My Playlists</Button>}
                {auth.isAuthenticated() && <Button color="inherit" onClick={() => props.history.push('/report1')}>Popularity Report</Button>}
                {auth.isAuthenticated() && <Button color="inherit" onClick={() => props.history.push('/report2')}>Artist Report</Button>}

                {auth.isAuthenticated() ?
                    <Button color="inherit" onClick={logOut}>Log Out</Button> :
                    <Button color="inherit" onClick={() => props.history.push('/login')}>Log In</Button>
                }
                {!auth.isAuthenticated() && <Button color="secondary" onClick={() => props.history.push('/register')}>Sign Up</Button>}
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(MyAppBar);
