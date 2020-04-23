import React, { useState, useEffect } from "react";
import Card from "./CardUser";

function TrialList(props) {
  const [howManyEnrolled, setHowManyEnrolled] = useState([]);
  const enrollment = props.enrollment;
  const enrolled = props.enrolled;
  const trials = props.trials;

  //  calculate how many are enrollments
  useEffect(() => {
    const totalCount = [];
    const count = {};
    //extract trialId and store in @totalCount
    for (let index = 0; index < enrollment.length; index++) {
      totalCount.push(enrollment[index].trialId);
    }
    //count duplicates and you get how many participants are in trials
    //stored in @count than stored in @howManyEnrolled
    totalCount.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    setHowManyEnrolled(count);
  }, [enrollment]);

  return (
    <div>
      {trials.map((trial) => {
        //Enrolled trials tab
        if (props.enrolledRender) {
          if (enrolled.includes(trial.id + "approved")) {
            return (
              <Card
                key={trial.id}
                {...trial}
                loggedUser={props.loggedUser}
                isEnrolled={true}
                isMaxEnrolled={trial.maxPartipants >= howManyEnrolled[trial.id]}
              />
            );
          }
        } else {
          return (
            <Card
              key={trial.id}
              {...trial}
              getEnrollment={props.getEnrollment}
              setEnrollment={props.setEnrollment}
              loggedUser={props.loggedUser}
              isApproved={enrolled.includes(trial.id + "approved")}
              isRejected={enrolled.includes(trial.id + "rejected")}
              isCancelled={enrolled.includes(trial.id + "cancelled")}
              isPending={enrolled.includes(trial.id + "pending")}
              isMaxEnrolled={trial.maxPartipants >= howManyEnrolled[trial.id]}
            />
          );
        }
      })}
    </div>
  );
}

export default TrialList;
