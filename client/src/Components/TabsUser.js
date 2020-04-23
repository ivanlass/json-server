import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from "axios";
import TrialList from './TrialList'


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
    'aria-controls': `nav-tabpanel-${index}`,
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
  const [enrollment, setEnrollment] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [trials, setTrials] = useState([]);

  const loggedUser = props.user

  const fetch = async (url, sets) => {
    const result = await axios(url);
    sets(result.data);
  };

  //Fetch trials and enrollments
  useEffect(() => {
    fetch("http://localhost:3000/Trial", setTrials);
    fetch("http://localhost:3000/Enrollment", setEnrollment);
  }, []);

  
  //when enrollments is fetched filter enrollments id+status
  //that this user participate and store in @enrolled
  useEffect(() => {
    let enrolledTrials = [];
    for (let index = 0; index < enrollment.length; index++) {
      if (parseInt(enrollment[index].userId) === loggedUser) {
        enrolledTrials.push(enrollment[index].trialId+enrollment[index].status);
      }
    }
    setEnrolled(enrolledTrials)
  }, [enrollment]);

  //fetch data after submiting something based on arguments
  const getData = (url, set) => {
    fetch(url, set);
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
          <LinkTab label="Trials" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Enrolled trials" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TrialList setEnrollment={setEnrollment} getEnrollment={getData} loggedUser={props.user}  {...props} enrollment={enrollment} enrolled={enrolled} trials={trials}/>
      </TabPanel>
      <TabPanel value={value} index={1}>

      <TrialList enrolledRender={true} enrollment={enrollment} enrolled={enrolled} trials={trials}/>

      </TabPanel>
    </div>
  );
}