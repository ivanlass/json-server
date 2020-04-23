import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "inline-block",
    margin: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  bg: {
    background: "#ececec"
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  const submitEnrollment = (e) => {
    e.preventDefault();
    const time = Date.now();
    const formatedDate = new Date(time).toLocaleDateString("fr-CA");
    axios
      .post("http://localhost:3000/Enrollment", {
        id: time,
        createdAt: formatedDate,
        userId: props.loggedUser,
        trialId: props.id,
        status: "pending",
      })
      .then((resp) => {
        console.log(resp.data);
        props.getEnrollment(
          "http://localhost:3000/Enrollment",
          props.setEnrollment
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.bg}>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Start date: {props.startDate.substring(0, 10)}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Price: {props.priceInEUR} EUR
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={submitEnrollment}
          size="small"
          disabled={
            Date.parse(props.startDate) > Date.now() ||
            props.isApproved ||
            props.isRejected ||
            props.isEnrolled ||
            props.isCancelled ||
            props.isPending ||
            props.isMaxEnrolled
          }
          data-userid={props.user}
        >
          Enroll
        </Button>
      </CardActions>
    </Card>
  );
}
