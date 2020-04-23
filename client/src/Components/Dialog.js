import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import EditTrialForm from "./EditTrialForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Edit {props.trial.name} trial
        </DialogTitle>
        <EditTrialForm
          handleClose={props.handleClose}
          getTrialJSON={props.getTrialJSON}
          setTrials={props.setTrials}
          trial={props.trial}
        />
      </Dialog>
    </div>
  );
}
