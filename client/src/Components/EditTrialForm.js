import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import BasicDatePickers from "./DatePicker";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function EditTrialForm(props) {
  const [name, setName] = useState();
  const [regStartDate, setRegStartDate] = useState();
  const [regEndDate, setRegEndDate] = useState();
  const classes = useStyles();

  const getDate = (date, start) => {
    date.toISOString();
    date.toLocaleDateString();
    const formatedDate = new Date(date).toLocaleDateString("fr-CA");
    if (start) {
      setRegStartDate(formatedDate);
    } else setRegEndDate(formatedDate);
  };

  const submitEditForm = () => {
    axios
      .put(`http://localhost:3000/trial/${props.trial.id}/`, {
        id: props.trial.id,
        name: name || props.trial.name,
        startDate: props.trial.startDate,
        endDate: props.trial.endDate,
        registrationStartDate:regStartDate || props.trial.registrationStartDate,
        registrationEndDate: regEndDate || props.trial.registrationEndDate,
        maxPartipants: props.trial.maxPartipants,
        priceInEUR: props.trial.priceInEUR,
      })
      .then((resp) => {
        props.getTrialJSON("http://localhost:3000/Trial", props.setTrials);
        props.handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      justify="space-around"
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <Grid container justify="space-around">
        <TextField
          id="standard-secondary"
          label={props.trial.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          color="primary"
        />
        <BasicDatePickers
          starting={true}
          label="Registration start date"
          trial={props.trial.registrationStartDate}
          getDate={getDate}
        />
        <BasicDatePickers
          starting={false}
          label="Registration end date"
          trial={props.trial.registrationEndDate}
          getDate={getDate}
        />
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={submitEditForm}>
            Submit
          </Button>
        </DialogActions>
      </Grid>
    </form>
  );
}
