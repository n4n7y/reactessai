import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useUserDispatch } from "../utils/loginContext";
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",

    backgroundColor: "#fff",

    maxWidth: "28em",
    minWidth: "21em",
    boxShadow: "0px 0px 20px 0px rgba(15, 15, 15, 0.1)",
    borderRadius: "6px",
    padding: "24px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
    width: "100%",
  },
  errors: {
    color: "#e74c3c",
  },
}));

function Login() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  // const { register, handleSubmit, errors } = useForm();
  const dispatch = useUserDispatch();
  const history  = useHistory();
  const onSubmit = () => {
    localStorage.setItem("id", true)
    dispatch({ type: "LOGIN_SUCCESS" });
    history.push('/');
  };


  return (
    <div>


      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form}
          >
            {/* onSubmit={handleSubmit(onSubmit)} */}
            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="email"
              autoComplete="email"
              name="email"
            // inputRef={register({ required: true })}
            />
           

            <TextField
              // inputRef={register({ required: true, minLength: 6 })}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />


            {isLoading ? (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
              >
                Login
              </Button>
            )}


          </form>
        </div>


      </Container>

    </div>
  );
}

export default Login
