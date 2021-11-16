// screens/AddUserScreen.js

import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  StatusBar,
} from "react-native";
import firebase from "../database/firebase";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      projectId: "",
      projectName: "",
    };
  }

  getInputValue = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  createProject = async () => {
    console.log("here");
    if (this.state.projectId == "" || this.state.projectName == "") {
      alert("Please fill the Inputs, then Submit.");
    } else {
      await firebase.db.collection("Projects").add({
        projectId: this.state.projectId,
        projectName: this.state.projectName,
      });

      console.log("success");
      alert("Project Created successfully");
      this.props.navigation.navigate("ProjectList",{});
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

  render() {
    return (
      <View style={styles.container}>
        <Text>Create Project </Text>
        <TextInput
          style={styles.input}
          placeholder="Project id"
          placeholderTextColor="#003f5c"
          value={this.state.projectId}
          onChangeText={(projectId) =>
            this.getInputValue(projectId, "projectId")
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Project name"
          placeholderTextColor="#003f5c"
          value={this.state.projectName}
          onChangeText={(projectName) =>
            this.getInputValue(projectName, "projectName")
          }
        />
        {/* <Button title="Create" onPress={() => navigation.navigate("Tasks")}>
              {" "}
            </Button> */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.createProject()}
        >
          <Text>Create Project</Text>
        </TouchableOpacity>
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
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonStyle: {
    width: 250,
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#327C8F",
  },
});

export default CreateProject;
