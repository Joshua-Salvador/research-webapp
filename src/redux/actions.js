import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const setEmail = (email) => {
  return {
    type: "SET_EMAIL",
    payload: { email },
  };
};

export const setRespondentInfo = (respondentInfo) => {
  return {
    type: "SET_RESPONDENT_INFO",
    payload: {
      username: respondentInfo.username,
      phoneNumber: respondentInfo.phoneNumber,
      isFromGuadalupe: respondentInfo.isFromGuadalupe,
    },
  };
};

export const setHouseholdInfo = (householdInfo) => {
  return {
    type: "SET_HOUSEHOLD_INFO",
    payload: {
      individuals: householdInfo.individuals,
      occupations: [...householdInfo.occupations],
      monthlyIncome: householdInfo.monthlyIncome,
    },
  };
};

export const setFeedback = (feedback) => {
  return {
    type: "SET_FEEDBACK",
    payload: {
      clarity: feedback.clarity,
      information: feedback.information,
    },
  };
};

export const setError = (err) => {
  return {
    type: "SET_ERROR",
    payload: {
      message: err.message,
      code: err.code,
    },
  };
};

export const addUserToDatabase = (email) => async (dispatch) => {
  const user = { email, password: "123456" };
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log(res);
    localStorage.setItem("uid", res.user.uid);
    localStorage.setItem("email", res.user.email);
    await dispatch(setEmail(user.email));
  } catch (err) {
    console.error(Object.keys(err));
    dispatch(setError(err));
    throw new Error(err);
  }
};
