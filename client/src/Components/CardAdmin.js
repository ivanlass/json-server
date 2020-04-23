import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "inline-block",
    margin: 20
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

  return (
    <Card className={classes.root}>
      <CardContent className={classes.bg}>
        <Typography variant="h5" component="h2">
          {props.trial.name}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Start date: {props.trial.registrationStartDate.substring(0, 10)}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Price: {props.trial.priceInEUR} EUR
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={props.handleClickOpen}
          data-id={props.trial.id}
          data-name={props.trial.name}
          data-enddate={props.trial.endDate}
          data-startdate={props.trial.startDate}
          data-registrationstartdate={props.trial.registrationStartDate}
          data-registrationenddate={props.trial.registrationEndDate}
          data-maxpartipants={props.trial.maxPartipants}
          data-priceineur={props.trial.priceInEUR}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
