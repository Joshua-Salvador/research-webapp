import "./App.css";
import CoverLetter from "./components/CoverLetter";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import RespondentInformation from "./components/RespondentInformation";
import Questions from "./components/Questions";
import Feedback from "./components/Feedback";
import { useSelector } from "react-redux";
import ThankYou from "./components/ThankYou";
import DataVisuals from "./components/DataVisuals";

function App() {
  const state = useSelector((state) => state);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {state.email ? <Redirect to="/resinfo" /> : <CoverLetter />}
          </Route>
          <Route exact path="/resinfo">
            {state.email ? <RespondentInformation /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/questions">
            {localStorage.getItem("uid") ? <Questions /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/feedback">
            {state.email ? <Feedback /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/thankyou">
            {state.email ? <ThankYou /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/vizdata">
            <DataVisuals />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
