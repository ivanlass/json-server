import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DatePicker from "./DatePicker";
import Button from "@material-ui/core/Button";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 40,
  },
  block: {
    display: "block",
    margin: 20,
  },
}));

export default function NewTrial(props) {
  const [name, setName] = React.useState(0);
  const [startDate, setStartDate] = React.useState(0);
  const [endDate, setEndDate] = React.useState(0);
  const [startRegDate, setStartRegDate] = React.useState(0);
  const [endRegDate, setEndRegDate] = React.useState(0);
  const [maxPart, setMaxPart] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const classes = useStyles();

  const makeNewTrial = (e) => {
      e.preventDefault()
    axios.post('http://localhost:3000/trial', {
        id: Date.now(),
        name: name,
        startDate: startDate,
        endDate: endDate,
        registrationStartDate: startRegDate,
        registrationEndDate: endRegDate,
        maxPartipants: parseInt(maxPart),
        priceInEUR:parseInt(price)
}).then(resp => {
    props.getTrials('http://localhost:3000/trial', props.setTrials)
    props.goToFirstTab()
}).catch(error => {
    console.log(error);
});   
  };

  const getDate = (date, purpose) => {
      date.toISOString();
      date.toLocaleDateString();
      const formatedDate = new Date(date).toLocaleDateString("fr-CA");
    switch (purpose) {
      case "startDate":
        setStartDate(formatedDate);
        break;
      case "endDate":
        setEndDate(formatedDate);
        break;
      case "startRegDate":
        setStartRegDate(formatedDate);
        break;          
      default:
        setEndRegDate(formatedDate);
        break;
    }
    
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item>
              <form onSubmit={makeNewTrial}>
            <TextField
            required
              label="Name"
              onChange={(e) => setName(e.currentTarget.value)}
              className={classes.block}
            />
            <DatePicker
            required
              getDate={getDate}
              purpose="startDate"
              label="Start date"
            />
            <DatePicker required getDate={getDate} purpose="endDate" label="End date" />
            <DatePicker
            required
              getDate={getDate}
              purpose="startRegDate"
              label="Start registration date"
            />
            <DatePicker
            required
              getDate={getDate}
              purpose="endRegDate"
              label="End registration date"
            />
            <TextField
            required
              label="Maximal partipians"
              onChange={(e) => setMaxPart(e.currentTarget.value)}
              type="number"
              className={classes.block}
            />
            <TextField
            required
              label="Price in EUR"
              onChange={(e) => setPrice(e.currentTarget.value)}
              type="number"
              className={classes.block}
            />
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
