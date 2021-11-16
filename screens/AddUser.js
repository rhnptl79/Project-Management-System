// screens/AddUserScreen.js

import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import firebase from "../database/firebase";

class AddUserScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  getInputValue = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  saveUser = async () => {
    console.log("here");
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.name == ""
    ) {
      alert("Please fill the Inputs, then Submit.");
    } else {
      await firebase.db.collection("Accounts").add({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });
      console.log("success");
      alert("saved");
      Alert.alert(
        "SignUp",
        "User Created successfully",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("Login"),
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  };

  render() {
    //   if(this.state.isLoading){
    //     return(
    //       <View style={styles.preloader}>
    //         <ActivityIndicator size="large" color="#9E9E9E"/>
    //       </View>
    //     )
    //   }
    return (
      <View style={[styles.container]}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          value={this.state.name}
          onChangeText={(name) => this.getInputValue(name, "name")}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={this.state.email}
          onChangeText={(email) => this.getInputValue(email, "email")}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          value={this.state.password}
          onChangeText={(password) => this.getInputValue(password, "password")}
        />

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => this.saveUser()}
        >
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 50,
    width: 250,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  signupBtn: {
    width: 250,
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#327C8F",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddUserScreen;
