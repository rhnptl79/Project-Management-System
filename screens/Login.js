import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebase";

export default function Login({ navigation }) {
  const adminUserId = "SuperAdmin";
  const admPass = "111";
  //state settings using hooks
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const LoginCheck = () => {
    //if admin
    // navigation.navigate("ProjectList");
    //navigation.navigate("UserTaskList", { userEmailId: userName });
    if (userName == adminUserId && password == admPass) {
      // alert(userName);
      // alert(password);
      navigation.navigate("ProjectList");
    } else {
      console.log("Member login");
      loginMemberCheck();
    }
  };

  const loginMemberCheck = () => {
    console.log("here query" + userName + "   passs==" + password);

    var citiesRef = firebase.db
      .collection("Accounts")
      .where("email", "==", userName)
      .where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          alert("Login Success");
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            navigation.navigate("UserTaskList", { userEmailId: userName });
          });
        } else {
          alert("Please retry.. Credentials Invalid or Network Error");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    forFreshAccess();
  }, []);

  const forFreshAccess = () => {
    console.log("freshAPI Access");
    var citiesRef = firebase.db
      .collection("Accounts")
      .where("email", "==", "p")
      .where("password", "==", "p")
      .get()
      .then((querySnapshot) => {})
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={(userId) => setUserName(userId)}
        // value={}
        placeholder="UserName"
        keyboardType="UserName"
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        // value={}
        placeholder="Password"
        keyboardType="Password"
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => LoginCheck()}>
        <Text>Login</Text>
      </TouchableOpacity>

      {/* <Button style={{color: 'red', marginTop: 10, padding: 10}} title="Sign Up" onPress={() => navigation.navigate("SignUp")}/> */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("AddUser")}
      >
        <Text>Create Account</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
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
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginBtn: {
    width: 250,
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#327C8F",
  },
});
