import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Picker,
  Button,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "../database/firebase";

export default function Tasks({ navigation }) {
  const [date, setDate] = useState(new Date(1636553250796));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [showStart, setShowStart] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [taskId, setTaskId] = useState("");

  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [hourRate, sethourRate] = useState("");

  const [selectedProject, setSelecteProject] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  const [selectedTaskType, setSelectedTaskType] = useState("1000");

  const [projectDetailArray, setProjectDetailArray] = useState([]);
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    getUsers();
    getProjectList();
  }, []);

  const getProjectList = () => {
    console.log("getProjectList");
    var projArray = [];
    var projectRef = firebase.db
      .collection("Projects")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          console.log("Task Retrieved Success");
          querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var obj = {
              projectId: doc.data().projectId,
              projectName: doc.data().projectName,
            };
            projArray.push(obj);
            console.log("get Task -> for project");
          });
          console.log("projArray");
          console.log(projArray);
          setProjectDetailArray(projArray);
        } else {
          alert("Please retry..Network Error");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  const getUsers = () => {
    var citiesRef = firebase.db
      .collection("Accounts")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var obj = {
              userId: doc.data().email,
            };
            userArray.push(obj);
          });
          setUserArray(userArray);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const createTasks = async () => {
    // alert(selectedTaskType);
    if (
      taskId == "" ||
      taskId == "" ||
      selectedMember == "" ||
      selectedProject == "" ||
      selectedTaskType == "" ||
      taskDesc == "" ||
      startDate == "" ||
      endDate == "" ||
      hourRate == ""
    ) {
      alert("Please fill the Inputs, then Submit.");
    } else {
      console.log("here");
      await firebase.db.collection("Tasks").add({
        taskId: taskId,
        projectId: selectedProject,
        taskName: taskName,
        description: taskDesc,
        startDate: startDate,
        endDate: endDate,
        hourRate: hourRate,
        memberEmailId: selectedMember,
        isComplete: false,
        taskType: selectedTaskType,
        totalhour: "0",
      });

      console.log("success");
      alert("Task Created successfully");
      navigation.navigate("ProjectList");
    }
    // Alert.alert(
    //   "Admin",
    //   "Project Created successfully",
    //   [
    //     {
    //       text: "OK",
    //       onPress: () => this.props.navigation.navigate("ProjectList"),
    //     },
    //   ],
    //   {
    //     cancelable: false,
    //   }
    // );
  };

  const onStartDateChange = (event, selectedDate) => {
    //alert("start date" + selectedDate);
    const currentDate = selectedDate || date;
    setShowStart(Platform.OS === "ios");
    setDate(currentDate);
    console.log("selected date" + currentDate.getDate());
    var dateString =
      currentDate.getDate() +
      "/" +
      currentDate.getMonth() +
      "/" +
      currentDate.getFullYear();
    //alert(dateString);
    setStartDate(dateString);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log("selected date" + currentDate.getDate());
    var dateString =
      currentDate.getDate() +
      "/" +
      currentDate.getMonth() +
      "/" +
      currentDate.getFullYear();
    setEndDate(dateString);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showModeStart = (currentMode) => {
    setShowStart(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const showDatepickerStart = () => {
    showModeStart("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text>Tasks</Text>
        <Text> Choose TaskType</Text>
        <Picker
          selectedValue={selectedMember}
          style={{ height: 50, width: "69%" }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedTaskType(itemValue)
          }
        >
          <Picker.Item value="1000" label="Normal Task" />
          <Picker.Item value="1001" label="Mandatory Task" />
        </Picker>
        <TextInput
          style={styles.input}
          onChangeText={(taskId) => setTaskId(taskId)}
          // value={}
          placeholder="Task ID"
          keyboardType="Task ID"
        />
        <TextInput
          style={styles.input}
          onChangeText={(taskId) => setTaskName(taskId)}
          // value={}
          placeholder="Task Name"
          keyboardType="Task Name"
        />
        <TextInput
          style={styles.description}
          onChangeText={(taskId) => setTaskDesc(taskId)}
          // value={}
          placeholder="Task Description"
          keyboardType="Task Description"
        />
        <Text style={{ marginTop: 20 }}> Select Members</Text>
        <Picker
          selectedValue={selectedProject}
          style={{ height: 50, width: "69%" }}
          onValueChange={(itemValue, itemIndex) => setSelectedMember(itemValue)}
        >
          {userArray.map(function (val, index) {
            console.log(val.userId);
            return <Picker.Item value={val.userId} label={val.userId} />;
          })}
        </Picker>

        <Text> Select Project</Text>
        <Picker
          selectedValue={selectedMember}
          style={{ height: 50, width: "69%" }}
          onValueChange={(itemValue, itemIndex) => setSelecteProject(itemValue)}
        >
          {projectDetailArray.map(function (val, index) {
            return (
              <Picker.Item value={val.projectId} label={val.projectName} />
            );
          })}
        </Picker>
        <Text> Hourly Rate</Text>
        <TextInput
          style={styles.input}
          value={hourRate}
          onChangeText={(taskId) => sethourRate(taskId)}
          placeholder="Hourly Rate"
          keyboardType="Hourly Rate"
        />
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => showDatepickerStart()}
        >
          <Text>Start Date</Text>
        </TouchableOpacity>
        {showStart && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onStartDateChange}
          />
        )}
        <Text>{startDate}</Text>

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => showDatepicker()}
        >
          <Text>End Date</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onEndDateChange}
          />
        )}
        <Text>{endDate}</Text>

        <Button title="Create Tasks" onPress={() => createTasks()}>
          {" "}
        </Button>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
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
    height: 50,
    width: 250,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
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
  description: {
    height: 100,
    width: 250,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
});
