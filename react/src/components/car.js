import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { useUserState } from '../utils/loginContext';
import { TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import api from '../api/api';

const useStyles = makeStyles((theme) => ({
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
}));

export default function CarDetails(props) {
    const { isAuthenticated } = useUserState()
    const [comment, setComment] = useState("")
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const { value, setVoitures } = props
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
                }
            ).catch(
                e => console.error(e)
            )

        }
    }
    return (
        <Card className="col-md-10 mr-auto ml-auto mt-2 mb-2 border-none">
            <CardContent className="pb-0">
                <div className="d-flex flex-row justify-content-beetwen align-items-center">
                    <div>     {value.designation}
                    </div>
                    {
                        isAuthenticated ?
                            <>
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
                            </>
                            :
                            null
                    }
                </div>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit className="h-50">
                <CardContent className="">
                    {
                        React.Children.toArray(
                            value.comments.map((c) =>

                                <Typography paragraph>{c.comment}</Typography>
                            )
                        )
                    }
                    <div className="d-flex flex-row justify-content-beetwen align-items-center">
                        <TextField fullWidth id="standard-basic" value={comment} onChange={handleTextChange} label="Commentaire" />
                        <IconButton
                            onClick={addComment}
                            aria-label="comment"
                        >
                            <Edit />
                        </IconButton>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    )
}