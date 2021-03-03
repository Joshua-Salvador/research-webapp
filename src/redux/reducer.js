const initialState = {
  email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
  username: localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "Anonymous",
  phoneNumber: localStorage.getItem("phoneNumber")
    ? localStorage.getItem("phoneNumber")
    : "Anonymous",
  isFromGuadalupe: localStorage.getItem("isFromGuadalupe")
    ? localStorage.getItem("isFromGuadalupe")
    : false,
  householdInfo: {
    individuals: localStorage.getItem("individuals")
      ? localStorage.getItem("individuals")
      : 0,
    occupations: localStorage.getItem("occupations")
      ? localStorage.getItem("occupations")
      : [],
    monthlyIncome: localStorage.getItem("monthlyIncome")
      ? localStorage.getItem("monthlyIncome")
      : 0,
  },
  feedback: {
    clarity: localStorage.getItem("clarity")
      ? localStorage.getItem("clarity")
      : "",
    information: localStorage.getItem("information")
      ? localStorage.getItem("information")
      : "",
  },
  error: {
    message: "",
    code: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload.email,
      };
    case "SET_RESPONDENT_INFO":
      return {
        ...state,
        username: action.payload.username,
        phoneNumber: action.payload.phoneNumber,
        isFromGuadalupe: action.payload.isFromGuadalupe,
      };
    case "SET_HOUSEHOLD_INFO":
      return {
        ...state,
        householdInfo: {
          individuals: Number(action.payload.individuals),
          occupations: [...action.payload.occupations],
          monthlyIncome: Number(action.payload.monthlyIncome),
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        error: {
          message: action.payload.message,
          code: action.payload.code,
        },
      };
    case "SET_FEEDBACK":
      return {
        ...state,
        feedback: {
          clarity: action.payload.clarity,
          information: action.payload.information,
        },
      };
    default:
      return state;
  }
};

export default reducer;
