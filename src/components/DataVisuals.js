import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Paper from "@material-ui/core/Paper";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import firebase from "firebase/app";
import "firebase/firestore";
function DataVisuals() {
  const db = firebase.firestore();
  const [occupationData, setOccupationData] = useState([
    ["Occupation", "Quantity"],
  ]);
  const [monthlyIncomeData, setMonthlyIncomeData] = useState([
    ["Respondent ID", "Monthly Income"],
  ]);
  const [totalMonthlyIncomeData, setTotalMonthlyIncomeData] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getOccupationData = async () => {
      return db
        .collection("occupations")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            setOccupationData((prev) => [
              ...prev,
              [doc.id, doc.data().quantity],
            ]);
          });
        });
    };
    getOccupationData();
    console.log(occupationData);
  }, [db]);

  useEffect(() => {
    const getMonthlyIncomeData = async () => {
      return db
        .collection("monthlyIncomeData")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setTotalMonthlyIncomeData(
              (prev) => prev + doc.data().monthlyIncome
            );
            setMonthlyIncomeData((prev) => [
              ...prev,
              [doc.id, `Php ${doc.data().monthlyIncome}`],
            ]);
          });
        });
    };
    getMonthlyIncomeData();
  }, [db]);

  useEffect(() => {
    const getUserData = async () => {
      return db
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUsers((prev) => [...prev, { id: doc.id, ...doc.data() }]);
          });
        });
    };
    getUserData();
  }, [db]);
  console.log(users);
  return (
    <div className="form">
      <Chart
        width={"800px"}
        height={"500px"}
        chartType="PieChart"
        loader={<div>Loading Occupation Data ... </div>}
        options={{
          title: "Occupations Data",
          is3D: true,
        }}
        data={occupationData}
      />
      <Chart
        style={{ margin: "auto" }}
        chartType="Table"
        width={"800px"}
        // height={"500px"}
        loader={<div>Loading Monthly Income Data ... </div>}
        options={{
          title: "Monthly Income Data",
        }}
        data={[
          ...monthlyIncomeData,
          ["Total:", `Php ${totalMonthlyIncomeData}`],
        ]}
      />
      <Paper style={{ padding: 10 }} variant="outlined">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId={"UserUID"} label="Respondent ID" />
          {users.map((user) => (
            <TreeItem nodeId={user.id} label={`Respondent: ${user.id}`}>
              <TreeItem nodeId={user.email} label={user.email} />
              <TreeItem nodeId={user.username} label={user.username} />
              <TreeItem nodeId={user.phoneNumber} label={user.phoneNumber} />
              <TreeItem
                nodeId={user.householdInfo.individuals}
                label={`${user.householdInfo.individuals} of Household Members with Income`}
              />
              <TreeItem nodeId="occupations" label="Occupations">
                {user.householdInfo.occupations.map((occupation) => (
                  <TreeItem nodeId={occupation} label={occupation} />
                ))}
              </TreeItem>

              <TreeItem
                nodeId={user.householdInfo.monthlyIncome}
                label={`Php ${user.householdInfo.monthlyIncome}`}
              />
            </TreeItem>
          ))}
        </TreeView>
      </Paper>
    </div>
  );
}

export default DataVisuals;
