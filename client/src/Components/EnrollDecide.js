import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 80,
    textAlign: "center",
    height:"100%"
  },
});

export default function EnrollDecide(props) {
  const classes = useStyles();

  const submitDecide = (e) => {
    axios
      .put(
        `http://localhost:3000/Enrollment/${e.currentTarget.dataset.enrollid}/`,
        {
          id: e.currentTarget.dataset.enrollid,
          createdAt: e.currentTarget.dataset.created,
          userId: e.currentTarget.dataset.user,
          trialId: e.currentTarget.dataset.trialid,
          status: e.currentTarget.value,
        }
      )
      .then((resp) => {
        //get new enrollment called in TabAdmin.js getData()
        props.getEnrollmentJSON(
          "http://localhost:3000/Enrollment",
          props.setEnrollment
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="center">Trial</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.enrollment.map((enroll) => {
            if (enroll.status == "pending") {
              const usrEmail = props.user.find(
                (usr) => usr.id === enroll.userId
              );
              const trialName = props.trial.find(
                (el) => el.id === enroll.trialId
              );

              return (
                <TableRow key={trialName.name}>
                  <TableCell align="right">{trialName.name}</TableCell>
                  <TableCell align="right">{usrEmail.email}</TableCell>
                  <TableCell align="right">{enroll.status}</TableCell>
                  <TableCell align="right">
                    <Button
                      data-trialid={enroll.trialId}
                      data-user={enroll.userId}
                      data-created={enroll.createdAt}
                      data-enrollid={enroll.id}
                      onClick={submitDecide}
                      value="approved"
                      size="small"
                      variant="outlined"
                      color="primary"
                    >
                      Approve
                    </Button>
                    <Button
                      data-trialid={enroll.trialId}
                      data-user={enroll.userId}
                      data-created={enroll.createdAt}
                      data-enrollid={enroll.id}
                      onClick={submitDecide}
                      value="cancelled"
                      size="small"
                      variant="outlined"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      data-trialid={enroll.trialId}
                      data-user={enroll.userId}
                      data-created={enroll.createdAt}
                      data-enrollid={enroll.id}
                      onClick={submitDecide}
                      value="rejected"
                      size="small"
                      variant="outlined"
                      color="primary"
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
