import React, { Component, useState, useEffect } from "react";
import firebase from "../database/firebase";
import { useNavigation, useIsFocused } from "@react-navigation/native";

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

export default function UserTaskList({ props, route, navigation }) {
  const [projectDetailArray, setProjectDetailArray] = useState([]);
  const [projName, setProjName] = useState("");
  const [status, setStatus] = useState("");

  const { userEmailId } = route.params;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getTaskList();
    }
  }, [props, isFocused]);

  const getTaskList = () => {
    var projArray = [];

    var projectRef = firebase.db
      .collection("Tasks")
      .where("memberEmailId", "==", userEmailId)
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
          {item.taskName}
        </Text>
        <Text style={{ width: 120, height: 20, color: "black" }}>
          {item.taskId}
        </Text>
        {item.isComplete == true ? (
          // <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonStyleCompleted}>Completed</Text>
        ) : (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              navigation.navigate("UserTaskDetails", {
                taskId: item.taskId,
                taskName: item.taskName,
                userEmailId: userEmailId,
              })
            }
          >
            <Text>View Details</Text>
          </TouchableOpacity>
        )}
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
            marginTop: 20,
            marginLeft: "6%",
          }}
        >
          <Text style={{ width: 120, height: 20, color: "black" }}>
            Task Name
          </Text>
          <Text style={{ width: 120, height: 20, color: "black" }}>
            Task ID
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
  buttonStyleCompleted: {
    width: 100,
    borderRadius: 25,
    height: 40,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#327C8F",
  },
});
