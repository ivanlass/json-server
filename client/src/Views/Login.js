import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Login(props) {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <form className="form" onSubmit={props.submit} data-value={value}>
        <TextField
          className="input"
          onChange={(e) => setValue(e.target.value)}
          label="Enter your email"
        />
        <Button
          className="btn"
          style={{ display: "block" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default Login;
