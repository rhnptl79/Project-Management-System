import React, { Component, useState, useEffect } from "react";

import firebase from "../database/firebase";
import { useNavigation, useIsFocused } from "@react-navigation/native";
// import {
//   StyleSheet,
//   ScrollView,
//   View,
//   TouchableOpacity,
//   Text,
//   Button,
// } from "react-native";
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";

export default function ProjectList({ props, navigation }) {
  const [projectDetailArray, setProjectDetailArray] = useState([]);
  const [projName, setProjName] = useState("");
  const [status, setStatus] = useState("");
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getProjectList();
    }
  }, [props, isFocused]);

  const getProjectList = () => {
    console.log("getProjectList");

    var projArray = [];

    var projectRef = firebase.db
      .collection("Projects")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          // alert("Task Retrieved Success");

          console.log("Task Retrieved Success");
          querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            projArray.push(doc.data());

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

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 15,
          backgroundColor: "#BCDDE4",
          padding: 10,
        }}
      >
        <Text style={{ width: 120, height: 20, color: "black" }}>
          {item.projectName}
        </Text>
        <Text style={{ width: 120, height: 20, color: "black" }}>
          {item.projectId}
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            navigation.navigate("ProjectDetails", {
              projectId: item.projectId,
              projectName: item.projectName,
            })
          }
        >
          <Text>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.conainer}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("CreateProject")}
      >
        <Text>Create Project</Text>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Tasks")}
      >
        <Text>Create Task</Text>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("TaskListAdminView")}
      >
        <Text>Task List</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 20,
            marginLeft: "6%",
          }}
        >
          <Text style={{ width: 120, height: 20, color: "black" }}>
            Project Name
          </Text>
          <Text style={{ width: 120, height: 20, color: "black" }}>
            Project ID
          </Text>
          <Text style={{ width: 120, height: 20, color: "black" }}>
            {" "}
            Details
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.itemConainer}>
          <FlatList data={projectDetailArray} renderItem={renderItem} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemConainer: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    width: 100,
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#327C8F",
  },
});
