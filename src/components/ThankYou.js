import { Button } from "@material-ui/core";
import React from "react";
import "./Forms.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function ThankYou() {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const state = useSelector((state) => state);
  const history = useHistory();
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const userData = state;
      delete userData.error;
      const user = await auth.currentUser;
      if (user !== null) {
        if (userData.isFromGuadalupe) {
          await db.doc(`/users/${user.uid}`).set(userData);
          await db.doc(`/monthlyIncomeData/${user.uid}`).set({
            monthlyIncome: Number(userData.householdInfo.monthlyIncome),
            associatedRespondentId: user.uid,
          });
          await userData.householdInfo.occupations.forEach(async (_) => {
            try {
              const occupation = _.toLowerCase();
              const occupationRef = await db
                .doc(`/occupations/${occupation}`)
                .get();
              if (occupationRef.exists) {
                await db.doc(`/occupations/${occupation}`).update({
                  quantity: firebase.firestore.FieldValue.increment(1),
                });
              } else {
                db.doc(`/occupations/${occupation}`).set({ quantity: 1 });
              }
            } catch (error) {
              console.error(error);
            }
          });
        }

        localStorage.clear();
        return window.location.reload();
      }
      throw new Error(
        "You do not have the right credentials to submit a survey response"
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form">
      <h1>Thank You for Your Time </h1>
      <p>
        Your identity will remain private and can only be accessible by the
        researchers. Thank you for partaking in this survey as it will greatly
        aid our study.
      </p>
      <h3>Confirm Submission of Data for Research</h3>
      <p>
        * Once your response has been submitted, you cannot edit your response.
      </p>
      <div className="form-group form-nav-buttons">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => history.goBack()}
        >
          Previous
        </Button>
        <Button color="primary" variant="contained" onClick={submitData}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ThankYou;
