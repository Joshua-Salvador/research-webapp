import React, { useState } from "react";
import "./Forms.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";

import { setFeedback } from "../redux/actions";
import { useHistory } from "react-router";

function Feedback() {
  const [clarity, setClarity] = useState(
    localStorage.getItem("clarity") ? localStorage.getItem("clarity") : ""
  );
  const [information, setInformation] = useState(
    localStorage.getItem("information")
      ? localStorage.getItem("information")
      : ""
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleContinue = async () => {
    try {
      await dispatch(
        setFeedback({
          clarity,
          information,
        })
      );
      localStorage.setItem("clarity", clarity);
      localStorage.setItem("information", information);
      await history.push("/thankyou");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form">
      <h1>Survey Design Feedback</h1>
      <p>
        Your feedback is much appreciated to further improve the design of this
        survey.
      </p>
      <hr />
      <div className="form-group">
        <h3>
          Clarity of instructions and survey questions. (Were the questions and
          instructions clear and sufficient?) (Klaro ra ba ang mga pangutana?)
        </h3>
        <TextField
          type="text"
          value={clarity}
          onChange={(e) => setClarity(e.target.value)}
          label="Clarity Feedback"
          required
          fullWidth
        />
      </div>
      <div className="form-group">
        <h3>
          Respondent Information (Does the survey ask for too much personal
          information?) (Daghan ba kaayo ang pangutana tukod sa kasayuran sa
          kaugalingon?)
        </h3>
        <TextField
          type="text"
          value={information}
          onChange={(e) => setInformation(e.target.value)}
          label="Feedback on Respondent Information"
          required
          fullWidth
        />
      </div>
      <div className="form-nav-buttons">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => history.goBack()}
        >
          Previous
        </Button>
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

export default Feedback;
