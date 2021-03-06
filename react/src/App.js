import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import api from './api/api'

import Login from './components/Login';
import { useUserDispatch, useUserState } from './utils/loginContext';
import CarItem from './components/CarItem';
import { CarDetails } from './components/CarDetails';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const { isAuthenticated } = useUserState()
  const dispatch = useUserDispatch()
  const classes = useStyles();
  const history = useHistory()




  useEffect(() => {
    console.log({ isAuthenticated });
  }, [isAuthenticated])

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => {
            history.push("/")
          }} className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Liste Voitures
          </Typography>
          {
            !isAuthenticated ?
              <Button color="inherit" onClick={() => {
                history.push("login")
              }} >Login</Button>
              :
              <Button color="inherit" onClick={() => {
                localStorage.removeItem("id")
                dispatch({ type: "SIGN_OUT_SUCCESS" })
              }
              }>Logout</Button>
          }

        </Toolbar>
      </AppBar>
      <Switch>
        <Route path='/car' component={Home} />
        <Route
          path="/login" component={Login}
        />
        <Route exact path="/">
          <Redirect to="/car" />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

function Home() {
  const [voitures, setVoitures] = useState([])


  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const getListVoitures = () => {
    api.get('cars').then(
      res => {
        console.log({ res });
        setVoitures(res.data)
      }
    ).catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    const fetchList = async () => {
      await getListVoitures()
    }
    fetchList()
  }, [])

  return (

    <div className="container d-flex ">
      <div className="d-flex align-items-evenly flex-wrap">
        {
          voitures.length > 0
            ? React.Children.toArray(
              voitures.map((v) => (

                <CarItem value={v} setSelectedValue={setSelectedValue}  setOpen={setOpen} setVoitures={setVoitures} />
              ))
            ) :
            <div className="justify-center">
              <p>veillez ajouter des voitures dans votre Database</p>
            </div>
        }
      </div>
      {
        selectedValue ?
          <CarDetails selectedValue={selectedValue}  open={open} value={selectedValue} setVoitures={setVoitures} onClose={handleClose} />
          : null
      }

    </div>

  );

}

function NoMatch() {
  return (
    <div>
      <h3>No match found</h3>
    </div>
  );
}



export default App;
