import React, { useState } from "react";
import "./Forms.css";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import { useDispatch } from "react-redux";
import { setRespondentInfo } from "../redux/actions";
import { Redirect, useHistory } from "react-router";

function RespondentInformation() {
  if (!localStorage.getItem("uid")) {
    <Redirect to="/" />;
  }

  const [username, setUsername] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber")
      ? localStorage.getItem("phoneNumber")
      : ""
  );
  const [isFromGuadalupe, setIsFromGuadalupe] = useState(
    localStorage.getItem("isFromGuadalupe")
      ? localStorage.getItem("isFromGuadalupe")
      : false
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleContinue = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        setRespondentInfo({
          username,
          phoneNumber,
          isFromGuadalupe,
        })
      );
      localStorage.setItem("username", username);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("isFromGuadalupe", isFromGuadalupe);
      await history.push("/questions");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form">
      <h1>Respondent Information (Kasayuran sa Nagtubag)</h1>
      <hr />
      <div className="form-group">
        <h3>Name (optional) (Pangalan ug Apelyido)</h3>
        <TextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Name"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="form-group">
        <h3>Phone Number (optional) (Numero sa cellphone/telepono)</h3>
        <TextField
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Phone Number"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="form-group">
        <h3>Resident of Guadalupe (Residente sa Guadalupe)</h3>
        <FormControlLabel
          control={
            <Checkbox
              checked={isFromGuadalupe}
              onChange={(e) => setIsFromGuadalupe(e.target.checked)}
            />
          }
          label="Is presently a resident of Guadalupe"
        />
      </div>
      <div>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default RespondentInformation;
