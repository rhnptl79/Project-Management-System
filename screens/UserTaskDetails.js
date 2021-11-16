import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Button,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebase";
import DateTimePicker from "@react-native-community/datetimepicker";

class TasksDetails extends Component {
  constructor() {
    super();
    this.state = {
      taskId: "",
      projectId: "",
      taskName: "",
      description: "",
      taskStartDate: "",
      endDate: "",
      totalhour: "",
      completedDate: "",
      docId: "",
      mode: "",
      show: false,
      date: new Date(1636553250796),
    };
  }

  componentDidMount() {
    this.getTaskDetails();
  }

  getInputValue = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  getTaskDetails = () => {
    const { taskId } = this.props.route.params;
    // var taskId = "009";
    var taskref = firebase.db
      .collection("Tasks")
      .where("taskId", "==", taskId)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          alert("Task Retrieved Success");

          console.log("Task Retrieved Success");
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            this.setState({
              docId: doc.id,
              taskId: doc.data().taskId,
              taskName: doc.data().taskName,
              taskStartDate: doc.data().startDate,
              projectId: doc.data().projectId,
            });
          });
        } else {
          alert("Please retry..Network Error");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  validateSubmission = () => {
    const { userEmailId } = this.props.route.params;
    var taskArray = [];
    var isCallSubmit = true;
    var taskref = firebase.db
      .collection("Tasks")
      .where("memberEmailId", "==", userEmailId)
      .where("projectId", "==", this.state.projectId)
      .where("isComplete", "==", false)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          // alert("Task Retrieved Success");

          alert("other tasks are there");
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (this.state.taskId != doc.data().taskId) {
              if (doc.data().taskType == "1001") {
                //1001 is mandatory task
                alert(
                  "You have to do the Mandatory task first. Task Name:" +
                    doc.data().taskName
                );
                isCallSubmit = false;
                // return false;
              }
            }

            // taskArray.push(doc.data());
          });
        } else {
          // alert("Please retry..Network Error");
        }
        if (isCallSubmit) {
          alert("submit user task");
          this.updateUsertask();
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  updateUsertask = async () => {
    const { userEmailId } = this.props.route.params;
    await firebase.db
      .collection("Tasks")
      .doc(this.state.docId)
      .set(
        {
          completedDate: this.state.completedDate,
          totalhour: this.state.totalhour,
          isComplete: true,
        },
        { merge: true }
      )
      .then(() => {
        alert("Submitted the task");

        console.log("Document successfully written!");
        this.props.navigation.navigate("UserTaskList", {
          userEmailId: userEmailId,
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  onCompleteDateChange = (event, selectedDate) => {
    //alert(selectedDate);
    const currentDate = selectedDate || date;
    var booShow = Platform.OS === "ios";
    this.setState({ show: booShow });
    this.setState({ date: currentDate });
    console.log("selected date" + currentDate.getDate());
    var dateString =
      currentDate.getDate() +
      "/" +
      currentDate.getMonth() +
      "/" +
      currentDate.getFullYear();
    // alert(dateString);
    this.setState({ completedDate: dateString });
  };

  showMode = (currentMode) => {
    this.setState({ show: true, mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode("date");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Task Details - Submit</Text>
        <Text>Task ID</Text>
        <TextInput
          style={styles.input}
          value={this.state.taskId}
          onChangeText={(taskId) => this.getInputValue(taskId, "taskId")}
          // value={}
          placeholder="Task ID"
          keyboardType="Task ID"
          editable={false}
        />
        <Text>Task Name</Text>
        <TextInput
          style={styles.input}
          value={this.state.taskName}
          onChangeText={(taskName) => this.getInputValue(taskName, "taskName")}
          placeholder="Task Name"
          keyboardType="Task Name"
          editable={false}
        />
        <Text>Project ID</Text>
        <TextInput
          style={styles.input}
          value={this.state.projectId}
          //   onChangeText={(taskName) => this.getInputValue(taskName, "taskName")}
          placeholder="Project ID"
          keyboardType="Project ID"
          editable={false}
        />
        {/* <TextInput
          style={styles.input}
          value={this.state.completedDate}
          onChangeText={(completedDate) =>
            this.getInputValue(completedDate, "completedDate")
          }
          placeholder="Completed Date"
          keyboardType="Completed Date"
        /> */}
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => this.showDatepicker()}
        >
          <Text>Completed Date</Text>
        </TouchableOpacity>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.onCompleteDateChange}
          />
        )}
        <Text>{this.state.completedDate}</Text>
        <TextInput
          style={styles.input}
          value={this.state.totalhour}
          onChangeText={(totalhour) =>
            this.getInputValue(totalhour, "totalhour")
          }
          placeholder="Total Hour"
          keyboardType="Total Hour"
        />
        <Button title="Submit" onPress={() => this.validateSubmission()}>
          {" "}
        </Button>
        <StatusBar style="auto" />
      </View>
    );
  }
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
  btnStyle: {
    width: 250,
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#327C8F",
  },
});

export default TasksDetails;
