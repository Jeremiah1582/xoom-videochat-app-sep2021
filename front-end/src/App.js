import React from "react";
import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"; //this is how we use styles with the Material-ui library

import VideoPlayer from "./comps/VideoPlayer.jsx";
import Options from "./comps/Options.jsx";
import Notifications from "./comps/Notifications.jsx";

const useStyles = makeStyles((theme) => ({ //note: when the arrow function has a 2nd (Parenthesis) before the curly {brackets}- it means return this specific object 
  // put the styles in here that you with to use on your components
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

function App() {
    const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          {" "}
          Xoom Video Chat App{" "}
        </Typography>
      </AppBar>

      <VideoPlayer />
     
      <Options>
        <Notifications />
      </Options>
    </div>

  );
}

export default App;
