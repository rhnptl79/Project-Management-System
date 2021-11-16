import React, { Component, useState, useEffect } from "react";
import firebase from "../database/firebase";
import { useNavigation } from "@react-navigation/native";
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ProjectDetails({ route, navigation }) {
  const [totalHours, setTotalHours] = useState("");
  const [costTotal, setCostTotal] = useState("");
  const [status, setStatus] = useState("");

  const { projectId, projectName } = route.params;
  useEffect(() => {
    getProjectTaskDeatils(projectId);
  }, []);

  const getProjectTaskDeatils = (projtId) => {
    console.log("getProjectList");

    var projTaskArray = [];
    var cProjectId = "";
    var cTotalHrs = 0;
    var cCost = 0;
    var cStatus = "Completed";

    var projectRef = firebase.db
      .collection("Tasks")
      .where("projectId", "==", projtId)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        // alert("query length =" + querySnapshot.docs.length);
        if (querySnapshot.docs.length > 0) {
          //  alert("Task Retrieved Success");
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            //status check
            //  alert("inside foreach");
            console.log("status ->" + doc.data().isComplete);
            if (!doc.data().isComplete) {
              cStatus = "Not Completed";
            }

            //Total Hours
            var tlHour = Number(doc.data().totalhour);

            cTotalHrs += tlHour;
            //Rate Calculation
            var hrRate = Number(doc.data().hourRate);
            console.log("hr rate" + hrRate);
            cCost += hrRate * tlHour;
            //set project id
            cProjectId = doc.data().projectId;
          });

          setCostTotal("" + cCost);
          setStatus(cStatus);
          setTotalHours("" + cTotalHrs);
          //   var projectCustomObject = {
          //     projectId: cProjectId,
          //     totalHour: cTotalHrs,
          //     cost: cCost,
          //     status: cStatus,
          //   };
          //   projTaskArray.push(projectCustomObject);
          //   console.log(projTaskArray);

          //   setProjectTaskArray(projTaskArray);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Project Details</Text>
      <Text>Project ID</Text>
      <TextInput
        editable={false}
        style={styles.input}
        value={projectId}
        // onChangeText={(taskId) => this.getInputValue(taskId, "taskId")}
        // value={}
        // placeholder="Task ID"
        // keyboardType="Task ID"
      />
      <Text>Project Name</Text>
      <TextInput
        style={styles.input}
        value={projectName}
        editable={false}
        // onChangeText={(taskId) => this.getInputValue(taskId, "taskId")}
        // value={}
        // placeholder="Task ID"
        // keyboardType="Task ID"
      />
      <Text> Total Hours</Text>

      <TextInput
        style={styles.input}
        value={totalHours}
        editable={false}
        // onChangeText={(taskName) => this.getInputValue(taskName, "taskName")}
        placeholder="0"
        // keyboardType="Task Name"
      />
      <Text> Total Cost</Text>
      <TextInput
        style={styles.input}
        value={costTotal}
        editable={false}
        // onChangeText={(description) =>
        //   this.getInputValue(description, "description")
        // }
        placeholder="0"
        // keyboardType="Task Description"
      />
      <Text> Project Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        editable={false}
        // onChangeText={(startDate) => this.getInputValue(startDate, "startDate")}
        placeholder="Not Completed"
        // keyboardType="Start Date"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
