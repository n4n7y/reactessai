import React, { useState } from 'react';
import clsx from 'clsx';
import { Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/EditRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IconButton from '@material-ui/core/IconButton';
import api from '../api/api';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '500px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardContainer: {
        margin: '1em 0px',
        padding: '0px',
        width: 500,
    },
    collapse: {
        maxHeight: '300px', overflowY: 'scroll',
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: '1em',
        backgroundColor:"rgb(200,200,200,0.7)"

    }
}));


export function CarDetails(props) {
    const { onClose, selectedValue, open, value, setVoitures } = props;

    const [comment, setComment] = useState("")
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleTextChange = (e) => {
        setComment(e.target.value)
    }
    const addComment = () => {
        if (comment && comment !== "") {
            console.log({ value });

            api.post(`cars/${value._id}`, { comment: comment }).then(
                res => {
                    console.log({ res });
                    setVoitures(res.data)
                    setComment("")
                    setExpanded(false)
                    onClose()

                }
            ).catch(
                e => console.error(e)
            )

        }
    }



    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} >

            <DialogTitle id="simple-dialog-title">{selectedValue.designation}</DialogTitle>
            <DialogContent className={classes.cardContainer}>
                <img src="https://source.unsplash.com/featured/?car" height="200" style={{ width: '100%', objectFit: "cover" }} alt="car"/>


                <div className="d-flex flex-row justify-content-beetwen align-items-center p-4">
                    <div className="d-flex flex-row justify-content-beetwen align-items-center w-100"  >
                        <TextField fullWidth id="standard-basic" value={comment} onChange={handleTextChange} label="Commentaire" />
                        <IconButton
                            color="primary"
                            onClick={addComment}
                            aria-label="comment"
                        >
                            <Add  />
                        </IconButton>
                    </div>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}

                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>

                </div>

                <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.collapse} >
                    {
                        React.Children.toArray(
                            value.comments.map((c) =>

                                <Typography paragraph>{c.comment}</Typography>
                            )
                        )
                    }
                </Collapse>


            </DialogContent>
        </Dialog>
    );
}