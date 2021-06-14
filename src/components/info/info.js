import React, {useState, useEffect} from "react";
import "./info.css";
import axios from "axios";
import auth from "../../services/auth";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider } from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core";

export default function AlbumInfo(props) {
    const [AlbumInfo, setAlbumInfo] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [dialog, setDialog] = useState(false);
    const [rating, setRating] = useState(75);
    const [text, setText] = useState('');

    const [hasReview, setHasReview] = useState(false);

    useEffect(() => {
        const albumId = props.match.params.id;
        getAlbumData(albumId);
        getReviews(albumId);
    },[]);

    function getAlbumData(albumId) {
        axios.get("http://localhost:8000/Info", {
            params: {
                albumId: albumId
            }
        }).then( resp => {
            setAlbumInfo(resp.data);
        }).catch( err => {
            console.warn(err.response.data.error);
        })
    }

    function getReviews(albumId) {
        axios.get("http://localhost:8000/reviews", {
            params: {
                albumId: albumId
            }
        }).then( resp => {
            const rvws = resp.data;
            setReviews(rvws);
            const user = JSON.parse(localStorage.getItem('user'));
            for (let i = 0; i < rvws.length; i++) {
                if (rvws[i].userId === user.username) {
                    setHasReview(true);
                    setRating(rvws[i].rating);
                    setText(rvws[i].text);
                }
            }
        }).catch( err => {
            console.warn(err.response.data.error);
        })
    }

    function publishReview() {
        if (text !== '') {
            const user = JSON.parse(localStorage.getItem('user'));
            const data = {
                albumId: props.match.params.id,
                userId: user.username,
                rating: rating,
                text: text
            };
            axios.post("http://localhost:8000/publish-review", data).then(resp => {
                closeDialog();
                getReviews(data.albumId);
            }).catch(err => {
                console.warn(err.response.data);
            })
        }
    }

    function modifyReview() {
        if (text !== '') {
            const user = JSON.parse(localStorage.getItem('user'));
            const data = {
                albumId: props.match.params.id,
                userId: user.username,
                rating: rating,
                text: text
            };
            axios.post("http://localhost:8000/update-review", data).then(resp => {
                closeDialog();
                getReviews(data.albumId);
            }).catch(err => {
                console.warn(err.response.data);
            })
        }
    }

    function beautifyDate(date) {
        const temp = new Date(date);
        return temp.toLocaleDateString();
    }

    function openDialog() {
        setDialog(true);
    }

    function closeDialog() {
        setDialog(false);
    }

    function albumWasReleased() {
        const currentDate = new Date();
        if (AlbumInfo) {
            const albumDate = new Date(AlbumInfo.releaseDate);
            return albumDate <= currentDate;
        }
        return true;
    }

    const AmountSlider = createMuiTheme({
        overrides: {
            MuiSlider: {
                root: {
                    color: rating < 50 ? '#e2553e' : rating <=70 ? '#e2c776' : '#52af77',
                    height: 8,
                },
                thumb: {
                    height: 24,
                    width: 24,
                    backgroundColor: '#fff',
                    border: '2px solid currentColor',
                    marginTop: -8,
                    marginLeft: -12,
                    '&:focus, &:hover, &$active': {
                        boxShadow: 'inherit',
                    },
                },
                active: {},

                track: {
                    height: 8,
                    borderRadius: 4,
                },
                rail: {
                    height: 8,
                    borderRadius: 4,
                },
            }
        }
    });

    return (
        <div className={"info-container"}>
            { AlbumInfo ?
                <div className={"content"}>
                    <div className={"album-photo"}
                         style={{
//                             backgroundImage: 'url(' + require(`../../assets/posters/${AlbumInfo.image}.jpg`) + ")",
                             backgroundSize: 'cover',
                             backgroundPosition: 'bottom'
                         }}
                    >
                    </div>
                    <div className={"info-block"}>
                        <div>
                            <div className={"album-name"}>{AlbumInfo.name}</div>
                            <span className={"album-genre"}>{AlbumInfo.genre}</span>
                        </div>
                        <div className={"additional-info-container"}>
                            <div className={"add-info-title"}>
                                Developers:
                                {AlbumInfo.developers.map((developer, index) => (
                                    <span key={index} className={"add-info-data"}> {developer.name}{index < AlbumInfo.developers.length-1 && ","}</span>
                                ))}
                            </div>
                            <div className={"add-info-title"}>
                                Platforms: <span className={"add-info-data"}>{AlbumInfo.platform}</span>
                            </div>
                            <div className={"add-info-title"}>
                                Release Date: <span className={"add-info-data"}>{beautifyDate(AlbumInfo.releaseDate)}</span>
                            </div>
                            <div className={"add-info-title"}>
                                Summary: <span className={"add-info-summary"}>{AlbumInfo.summary}</span>
                            </div>
                        </div>
                    </div>
                </div> :
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </div>
            }
            <div className={"review-cont"}>
                <span className={"review-header"}>Reviews</span>
                { auth.isAuthenticated() && albumWasReleased() &&
                    <Button
                        style={{
                            margin: '24px 0',
                        }}
                        disableElevation
                        variant="outlined"
                        size="large"
                        fullWidth
                        color="primary"
                        onClick={openDialog}
                    >
                        {hasReview ? "Modify" : "Write"} Review
                    </Button>
                }
                {
                    reviews ?
                    <div>
                        { reviews.length === 0 && <div className={"no-review-header"}> No reviews found. Wanna add one?</div>}
                        <Grid container spacing={2}>
                            {reviews.map((review, index)=> (
                                <Grid key={index} container item spacing={0} xs={12} sm={12} md={6}>
                                    <div className={"review-item-block"}>
                                        <div className={"review-item-title"}>
                                            <span className={"review-item-username"}>{review.userId},<br/>
                                            </span>
                                            <div
                                                className={
                                                    `review-item-rating ${review.rating < 50 ? 'bad-rating' : review.rating <= 70 ? 'av-rating' : 'good-rating'}`
                                                }
                                            >
                                                {review.rating}
                                            </div>
                                        </div>
                                        <div className={"review-item-text"}>
                                            {review.text}
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>:
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                }
                <Dialog onClose={closeDialog} open={dialog}>
                    <DialogTitle onClose={closeDialog}
                        style={{
                            width: '500px',
                        }}
                    >
                        New Review
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className={"dialog-slider"}>
                            <Typography>
                                Rating - <span style={{color: rating < 50 ? '#e2553e' : rating <=70 ? '#e2c776' : '#52af77'}}>{rating}</span>
                            </Typography>
                            <ThemeProvider theme={AmountSlider}>
                                <Slider
                                    valueLabelDisplay="auto"
                                    value={rating}
                                    onChange={(event, nextValue)=>setRating(nextValue)}
                                    step={1}
                                    min={0}
                                    max={100}
                                />
                            </ThemeProvider>
                        </div>
                        <div>
                            <TextField
                                value={text}
                                onChange={(e)=>setText(e.target.value)}
                                label="Review"
                                multiline
                                rows={8}
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        { !hasReview ?
                            <Button autoFocus onClick={publishReview} color="primary" variant="outlined">
                                Publish Review
                            </Button> :
                            < Button autoFocus onClick={modifyReview} color="primary" variant="outlined">
                            Modify Review
                            </Button>
                        }
                        <Button autoFocus onClick={closeDialog} color="default">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
