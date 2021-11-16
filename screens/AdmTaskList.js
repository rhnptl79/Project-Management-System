import React, { Component, useState, useEffect } from "react";
import firebase from "../database/firebase";
import { useNavigation } from "@react-navigation/native";
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

export default function TaskListAdminView({ route, navigation }) {
  const [projectDetailArray, setProjectDetailArray] = useState([]);
  const [projName, setProjName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = () => {
    var projArray = [];

    var projectRef = firebase.db
      .collection("Tasks")
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
        {/* <Text style={{ width: 110, height: 20, color: "black" }}>
          {item.memberEmailId}
        </Text> */}
        <Text style={{ width: 100, height: 20, color: "black" }}>
          {item.taskId}
        </Text>
        <Text style={{ width: 120, height: 20, color: "black" }}>
          {item.taskName}
        </Text>
        <Text style={{ width: 100, height: 20, color: "black" }}>
          {item.isComplete ? "Completed" : "Not Completed"}
        </Text>
        {/* //iscomplete -> then show completd */}
      </View>
    );
  };

  return (
    <View style={styles.conainer}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // marginTop: 20,
            marginLeft: "6%",
          }}
        >
          {/* <Text style={{ width: 80, height: 20, color: "black" }}>
            Member ID{" "}
          </Text> */}
          <Text style={{ width: 100, height: 20, color: "black" }}>
            Task ID
          </Text>
          <Text style={{ width: 120, height: 20, color: "black" }}>
            Task Name
          </Text>
          <Text style={{ width: 100, height: 20, color: "black" }}>
            Status
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 20 }}>
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
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // width: "100%",
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
