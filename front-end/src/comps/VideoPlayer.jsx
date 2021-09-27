import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../socketContext.js";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column", //styling: on mobile devices it will be all in one column
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));
function VideoPlayer() {
  const { call, callAccepted, myVideo, userVideo, stream, name, callEnded } =
    useContext(SocketContext);

  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {" "}
              {call.name || "Name"}{" "}
            </Typography>
            <video
              playInline
              muted
              ref={myVideo}
              autoPlay
              ClassName={classes.video}
            />
          </Grid>
        </Paper>
      )}

      {/*other users Video  */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}{" "}
            </Typography>
            <video
              playInline
              muted
              ref={userVideo}
              autoPlay
              ClassName={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}

export default VideoPlayer;
