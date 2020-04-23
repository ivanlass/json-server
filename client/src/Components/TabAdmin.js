import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import CardAdmin from "../Components/CardAdmin";
import Dialog from "../Components/Dialog";
import EnrollDecide from "./EnrollDecide";
import NewTrial from "./NewTrial";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [trials, setTrials] = useState([]);
  const [open, setOpen] = useState(false);
  const [trialForEdit, setTrialForEdit] = useState({});
  const [enrollment, setEnrollment] = useState({});
  const [user, setUser] = useState({});

  const fetch = async (url, sets) => {
    const result = await axios(url);
    sets(result.data);
  };

  //Fetch trials and enrollments
  useEffect(() => {
    fetch("http://localhost:3000/Trial", setTrials);
    fetch("http://localhost:3000/Enrollment", setEnrollment);
    fetch("http://localhost:3000/User", setUser);
  }, []);

  //fetch data after submiting something based on arguments
  const getData = (url, set) => {
    fetch(url, set);
  };

  const goToFirstTab = ()=>setValue(0)

  //Open modal and fetch trial obj with editable data and store in @trialForEdit
  const handleClickOpen = (e) => {
    const trial = e.currentTarget.dataset;
    const edit = {
      id: parseInt(trial.id),
      name: trial.name,
      startDate: trial.startdate,
      endDate: trial.enddate,
      registrationStartDate: trial.registrationstartdate,
      registrationEndDate: trial.registrationenddate,
      maxPartipants: parseInt(trial.maxpartipants),
      priceInEUR: parseInt(trial.priceineur),
    };
    setTrialForEdit(edit);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="all trials" href="/drafts" {...a11yProps(0)} />
          <LinkTab
            label="pending enrollments"
            href="/trash"
            {...a11yProps(1)}
          />
          <LinkTab label="New Trial" href="/trash" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {trials.map((trial) => {
          return (
            <CardAdmin
              key={trial.id}
              trial={trial}
              handleClickOpen={handleClickOpen}
            />
          );
        })}
        <Dialog
          getTrialJSON={getData}
          setTrials={setTrials}
          open={open}
          trial={trialForEdit}
          handleClose={handleClose}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EnrollDecide
          setEnrollment={setEnrollment}
          getEnrollmentJSON={getData}
          trial={trials}
          user={user}
          enrollment={enrollment}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NewTrial setTrials={setTrials} getTrials={getData} goToFirstTab={goToFirstTab}/>
      </TabPanel>
    </div>
  );
}
