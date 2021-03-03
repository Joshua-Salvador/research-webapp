import React, { useState } from "react";
import "./Forms.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";
import { addUserToDatabase } from "../redux/actions";
import { useHistory } from "react-router";

function CoverLetter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUserToDatabase(email));
      await history.push("/resinfo");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form">
      <h1>
        Median Income Survey Required for the study on the "Housing
        Affordability in Guadalupe, Cebu City"
      </h1>
      <hr />
      <p>Dear Respondent:</p>
      <p>
        Good day, we are a group of grade 12 Senior High School students from
        the University of San Carlos in the Science, Technology, Engineering,
        and Mathematics (STEM) strand. As a requirement for our Research
        subject, we are conducting a study on the “Housing Affordability in
        Guadalupe, Cebu City” to measure the affordability of housing in
        Guadalupe, Cebu City. In this study, we also aim to examine the current
        state of Guadalupe's housing market using data on household income and
        house price.
      </p>
      <p>
        To determine housing affordability in Guadalupe, Cebu, we would need to
        collect the household income of residents in Guadalupe and Cebu City.
        Thus, we are inviting you to participate in this research study by
        completing the attached survey. The following questionnaire will require
        approximately 5 minutes of your time to complete. There is no
        compensation for responding nor is there any known risk. In order to
        ensure that your information will remain confidential, we will not
        associate your identity with income data you provide and share it with
        the public nor will they be published, as our study will mainly deal
        with the median income of a population as a whole and its trends.
      </p>
      <p>
        If you choose to participate in this project, please answer all
        questions as honestly as possible. Participation is strictly voluntary
        and you may refuse to participate at any time. Also, we encourage you to
        share our survey with friends, relatives, and acquaintances who earn a
        steady income or live with family members that do.
      </p>
      <p>
        We would like to thank you for your time and favorable consideration of
        the approval and endorsement of this study.
      </p>
      <p>Sincerely,</p>
      <p>
        Iloso, Aldren
        <br /> Salvador, Joshua Enrick
        <br /> Tan, Henry Gregory <br /> Ting, Marcus Aidan <br /> Villanueva,
        Ramon Alphonso <br /> Yee, Klinnsonveins
      </p>
      <p>
        This survey requires email verification, if you have a member of your
        household who is currently enrolled in any of the campuses of the
        University of San Carlos, it would be appreciated if you use his/her
        email for email verification.
      </p>
      <div className="form-group">
        <TextField
          type="email"
          required
          value={email}
          onChange={emailInputHandler}
          label="Email"
          fullWidth
        />
      </div>
      <div className="form-group">
        <Button color="primary" variant="contained" onClick={handleContinue}>
          Continue
        </Button>
        <p className="error">
          {state.error.message ? state.error.message : null}
        </p>
      </div>
      <br />
    </div>
  );
}

export default CoverLetter;
