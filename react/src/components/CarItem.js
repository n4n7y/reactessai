import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/InfoRounded';
import IconButton from '@material-ui/core/IconButton';
import { useUserState } from '../utils/loginContext';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    expand: {
        marginLeft: 'auto',

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardContainer: {
        margin: '1em',
        width: 340,
    }
}));







export default function CarItem(props) {
    const { isAuthenticated } = useUserState()
    const classes = useStyles();
    const { value, setSelectedValue, setOpen } = props

    const handleClickOpen = () => {
        setSelectedValue(value)
        setOpen(true);
    };


    return (

        <Card className={classes.cardContainer}>
            <CardMedia
                className={classes.media}
                image="https://source.unsplash.com/featured/?car"
                title="Paella dish"
            />
            <CardContent className="pb-2">
                <div className="d-flex flex-row justify-content-beetwen align-items-center">
                    <div>
                        {value.designation}
                    </div>
                    {
                        isAuthenticated ?
                            <>
                                <IconButton
                                    className={classes.expand}
                                    onClick={handleClickOpen}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </>
                            :
                            null
                    }
                </div>
            </CardContent>
        </Card>


    )
}